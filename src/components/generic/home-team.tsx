import { Dribbble, Github, Linkedin } from "lucide-react";

const people = [
  {
    id: "pilla",
    name: "Dr. Gianluca Pilla",
    photo: "/assets/team/dr-pilla.jpeg",
    description:
      "Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
  },
  {
    id: "farese",
    name: "Dr. Valerio Farese",
    photo: "/assets/team/dr-farese.jpeg",
    description:
      "Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
  },
  {
    id: "pistilli",
    name: "Dr.ssa Valeria Pistilli",
    photo: "/assets/team/dr-pistilli.jpeg",
    description:
      "Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
  },
  {
    id: "raco",
    name: "Dr. Andrea Raco",
    photo: "/assets/team/dr-raco.jpeg",
    description:
      "Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
  },

];

export const HomeTeam = () => {
  return (
    <section className="py-32">
      <div className="contained flex flex-col items-start text-left">
        <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">
          Il Nostro Team
        </h2>
        <p className="mb-8 max-w-4xl text-muted-foreground lg:text-xl">
          Il team della Sirio Next Gen è formato dal Dr. Andrea Raco, dal Dr. Gianluca Pilla, dalla Dott.ssa Valeria Pistilli e dal Dr. Valerio Farese con la collaborazione di colleghi specializzati nelle singole branche, che vi accompagneranno nei diversi corsi presenti nella nostra offerta formativa.
        </p>
      </div>
      <div className="contained mt-16 grid gap-x-12 gap-y-8 lg:grid-cols-2">
        {people.map((person) => (
          <div key={person.id} className="flex flex-col sm:flex-row">
            <div className="mb-4 rounded-md aspect-square w-full shrink-0 text-clip bg-accent sm:mb-0 sm:mr-5 sm:size-48 bg-center bg-cover" style={{ backgroundImage: `url(${person.photo})` }}>
              {/* Avatar */}
            </div>
            <div className="flex flex-1 flex-col items-start">
              <p className="w-full text-left font-medium">{person.name}</p>
              <p className="w-full py-2 text-sm text-muted-foreground">
                {person.description}
              </p>
              <div className="my-2 flex items-start gap-4">
                <a href="#">
                  <Linkedin className="size-4 text-primary" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
