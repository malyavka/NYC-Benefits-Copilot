import Chat from "../components/Chat";

export default function Page() {
  return (
    <div className="pt-10">
      <section className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Find Your <span className="underline decoration-yellow-300 decoration-8 underline-offset-4">Hidden Benefits</span>
        </h1>
        <p className="mt-4 text-lg text-neutral-700 max-w-2xl">
          Tell us about your situation and we’ll surface NYC programs you may qualify for — with plain-language steps to apply.
        </p>
      </section>

      <Chat />

      <section className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border bg-white p-4 text-center">
          <div className="text-sm font-semibold">Personalized</div>
          <p className="text-sm text-neutral-600 mt-1">Matches by income, borough, household</p>
        </div>
        <div className="rounded-xl border bg-white p-4 text-center">
          <div className="text-sm font-semibold">Grounded</div>
          <p className="text-sm text-neutral-600 mt-1">Links to official NYC sources</p>
        </div>
        <div className="rounded-xl border bg-white p-4 text-center">
          <div className="text-sm font-semibold">Multilingual</div>
          <p className="text-sm text-neutral-600 mt-1">Plain English, Spanish, Russian, Chinese</p>
        </div>
      </section>
    </div>
  );
}
