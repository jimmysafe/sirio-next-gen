import { Candy, GraduationCap, HeartHandshake } from "lucide-react";

export const HomeAbout = () => {
  return (
    <section>
      <div className="contained flex flex-col gap-28">
        <div className="flex flex-col gap-7">
          <h1 className="text-4xl font-semibold lg:text-7xl">
            Il nostro obiettivo è supportarti fin dal termine degli studi.
          </h1>
          <p className="max-w-3xl text-lg">
            Ti offriamo gli strumenti necessari per affrontare con successo il mondo del lavoro, aiutandoti a sviluppare competenze fondamentali che saranno la base per il tuo ingresso nel settore e per una carriera solida e appagante.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <img
            src="/assets/home.jpg"
            alt="placeholder"
            className="size-full max-h-96 rounded-2xl object-cover"
          />
          <div className="flex flex-col justify-between gap-10 rounded-2xl bg-muted p-10">
            <p className="text-sm text-muted-foreground">LA NOSTRA MISSIONE</p>
            <p className="text-lg font-medium">
              Puntiamo a garantire un costante sviluppo professionale in tutte le branche dell’odontoiatria, accompagnandoti nel tuo percorso di crescita e affermazione nel settore.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:gap-20">
          <div className="max-w-xl">
            <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
              Formazione per Professionisti e Studenti
            </h2>
            <p className="text-muted-foreground">
              Accompagniamo laureati e studenti degli ultimi anni di corso con un percorso pratico e personalizzato, pensato per sviluppare competenze concrete e prepararti al meglio per il futuro professionale.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="flex flex-col bg-accent/50 p-4 rounded-lg">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-secondary">
                <GraduationCap className="size-5 text-primary-foreground" />
              </div>
              <h3 className="mb-3 mt-2 text-lg font-semibold">Percorso dedicato agli studenti universitari</h3>
              <p className="text-muted-foreground">
                Se sei al IV, V o VI anno di studi in odontoiatria, abbiamo creato un percorso pratico e mirato per aiutarti a costruire solide basi professionali e prepararti al meglio per il tuo futuro nel settore.
              </p>
            </div>
            <div className="flex flex-col bg-accent/50 p-4 rounded-lg">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-secondary">
                <Candy className="size-5 text-primary-foreground" />
              </div>
              <h3 className="mb-3 mt-2 text-lg font-semibold">Programmi per giovani odontoiatri</h3>
              <p className="text-muted-foreground">
                Rivolto agli odontoiatri Under 35, il nostro programma offre formazione avanzata e supporto concreto per il tuo sviluppo professionale e la tua crescita nel mondo della clinica.
              </p>
            </div>
            <div className="flex flex-col bg-accent/50 p-4 rounded-lg">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-secondary">
                <HeartHandshake className="size-5 text-primary-foreground" />
              </div>
              <h3 className="mb-3 mt-2 text-lg font-semibold">Formazione pratica e personalizzata</h3>
              <p className="text-muted-foreground">
                Che tu sia studente o giovane odontoiatra, i nostri percorsi sono studiati per garantirti competenze pratiche, aggiornamenti tecnologici e un accompagnamento costante verso il successo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
