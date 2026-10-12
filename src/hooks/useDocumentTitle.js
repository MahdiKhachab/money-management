import { useEffect } from 'react';
import { ORG_NAME } from '../config/env';

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | ${ORG_NAME}` : ORG_NAME;
  }, [title]);
};

export default useDocumentTitle;
