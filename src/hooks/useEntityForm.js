import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getErrorMessage } from '../api/client';
import { useToast } from '../components/ui';

/*
 * Shared create/edit form logic. The route param `id` switches to edit mode.
 *   initialValues  form state for a new record
 *   fetchOne(id)   loads the record in edit mode; fromEntity maps it to form state
 *   create / update(id, payload), toPayload maps form state to the API body
 *   validate(values) returns { field: message } for invalid fields
 */
const useEntityForm = ({ initialValues, fetchOne, fromEntity = (e) => e, create, update, toPayload = (v) => v, validate = () => ({}), listPath, messages }) => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const toast = useToast();

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    if (!isEdit) return undefined;
    let active = true;
    setLoading(true);
    fetchOne(id)
      .then((entity) => active && setValues({ ...initialValues, ...fromEntity(entity) }))
      .catch((error) => active && setLoadError(getErrorMessage(error)))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const setField = (name) => (eventOrValue) => {
    const value = eventOrValue?.target ? eventOrValue.target.value : eventOrValue;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const found = validate(values);
    if (Object.values(found).some(Boolean)) {
      setErrors(found);
      return;
    }
    setSubmitting(true);
    try {
      const payload = toPayload(values);
      if (isEdit) await update(id, payload);
      else await create(payload);
      toast.success(isEdit ? messages.updated : messages.created);
      navigate(listPath);
    } catch (error) {
      toast.error(getErrorMessage(error, 'تعذر حفظ البيانات.'));
    } finally {
      setSubmitting(false);
    }
  };

  return { id, isEdit, values, setField, errors, submitting, loading, loadError, handleSubmit };
};

export default useEntityForm;
