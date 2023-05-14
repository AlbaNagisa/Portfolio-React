import React, { useState } from "react";
import Loading from "./Loading";
import { Fade } from "react-awesome-reveal";
import validator from "validator";

const id = process.env.DISCORD_WEBHOOK_ID;
export default function ContactForm() {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [isEmail, setIsEmail] = useState<boolean | null>(null);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (validator.isEmail(email) == false) {
        setIsEmail(false);
        setIsLoading(false);
        return;
      } else {
        setIsEmail(true);
      }
      fetch(
        `https://discord.com/api/webhooks/${id}/${process.env.DISCORD_WEBHOOK_TOKEN?.toString()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            content:
              "||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| @everyone",
            embeds: [
              {
                title: `Nouveau message de ${name} ${lastName.toUpperCase()}`,
                color: "1055556",
                description: message,
                fields: [
                  {
                    name: "Email",
                    value: email,
                  },
                ],
              },
            ],
          }),
        }
      )
        .then(() => {
          setName("");
          setLastName("");
          setEmail("");
          setMessage("");
          setIsLoading(false);
          setIsSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setIsSuccess(false);
        });
    } catch (err) {
      console.log(err);
      setIsSuccess(false);
    }
  };
  const showButton = () => {
    if (isLoading && isSuccess == false) {
      return (
        <>
          <div className="flex w-full justify-center text-[#c03e3e]">
            Erreur lors de l&apos;envoie du message
          </div>
          <button
            type="submit"
            className="p-6 rounded-xl shadow-[-20px_20px_0px_0px_rgba(0,0,0,0.25)] border-[0.5px] border-[#16265f] bg-transparent  text-white text-xl w-auto self-center hover:transform hover:shadow-[-10px_10px_0px_0px_rgba(0,0,0,0.25)] duration-300 ease-linear transition-all"
          >
            Envoyer
          </button>
        </>
      );
    }
    if (isLoading) {
      return <Loading />;
    }

    if (!isLoading && isSuccess) {
      return (
        <>
          <div className="flex w-full justify-center text-[#3ec049]">
            Message envoyé avec succès
          </div>
          <button
            type="submit"
            className="p-6 rounded-xl shadow-[-20px_20px_0px_0px_rgba(0,0,0,0.25)] border-[0.5px] border-[#16265f] bg-transparent  text-white text-xl w-auto self-center hover:transform hover:shadow-[-10px_10px_0px_0px_rgba(0,0,0,0.25)] duration-300 ease-linear transition-all"
          >
            Envoyer
          </button>
        </>
      );
    }
    return (
      <button
        type="submit"
        className="p-6 rounded-xl shadow-[-20px_20px_0px_0px_rgba(0,0,0,0.25)] border-[0.5px] border-[#16265f] bg-transparent  text-white text-xl w-auto self-center hover:transform hover:shadow-[-10px_10px_0px_0px_rgba(0,0,0,0.25)] duration-300 ease-linear transition-all"
      >
        Envoyer
      </button>
    );
  };

  return (
    <Fade
      style={{
        background: `linear-gradient(208.84deg, rgba(9, 21, 67, 0.5) 17.75%, #101B44 74.01%)`,
      }}
      className="flex flex-col h-fit w-[35%] p-16 rounded-xl shadow-[-20px_20px_0px_0px_rgba(0,0,0,0.25)] text-white"
    >
      <form
        style={{
          background: `linear-gradient(208.84deg, rgba(9, 21, 67, 0.5) 17.75%, #101B44 74.01%)`,
        }}
        className="flex flex-col gap-6 text-white"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          placeholder="Prenom"
          required
          value={name}
          className="p-4 rounded-xl border-2 border-[#16265f] bg-transparent"
          onChange={(v) => setName(v.target.value)}
        />
        <input
          type="text"
          placeholder="Nom"
          required
          value={lastName}
          className="p-4 rounded-xl border-2 border-[#16265f] bg-transparent"
          onChange={(v) => setLastName(v.target.value)}
        />
        <>
          <input
            type="text"
            placeholder="Email"
            required
            value={email}
            className="p-4 rounded-xl border-2 border-[#16265f] bg-transparent"
            onChange={(v) => setEmail(v.target.value)}
          />
          {isEmail != null && isEmail == false ? (
            <div className="flex w-full justify-center text-[#c03e3e]">
              Email non valide
            </div>
          ) : (
            <></>
          )}
        </>
        <textarea
          placeholder="Message"
          required
          value={message}
          maxLength={4000}
          className="p-4 rounded-xl border-2 border-[#16265f] bg-transparent"
          onChange={(v) => setMessage(v.target.value)}
        />
        {showButton()}
      </form>
    </Fade>
  );
}
