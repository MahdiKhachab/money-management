import React from 'react';

const PageHero = ({ badge, title, description, icon: Icon }) => (
  <section className="reveal-section rounded-[2rem] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 text-white shadow-[0_30px_80px_rgba(30,64,175,0.25)] sm:p-8 lg:p-10">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl space-y-4">
        <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-blue-100 ring-1 ring-white/20">{badge}</span>
        <h1 className="text-3xl font-black leading-tight sm:text-4xl">{title}</h1>
        {description && <p className="text-base leading-8 text-blue-100">{description}</p>}
      </div>
      {Icon && (
        <div className="hidden h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white/10 ring-1 ring-white/10 backdrop-blur-sm sm:flex">
          <Icon className="h-7 w-7 text-blue-100" />
        </div>
      )}
    </div>
  </section>
);

export default PageHero;
