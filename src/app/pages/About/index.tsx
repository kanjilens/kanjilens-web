import React from "react";

const About: React.FC = () => {
  return (
    <main
      style={{
        maxWidth: 800,
        margin: "40px auto",
        padding: 24,
      }}
      role="main"
    >
      <h2>Entre em contato</h2>
      <p>
        Tem dúvidas ou sugestões? Envie um e-mail para{" "}
        <a href="mailto:kanjilens@gmail.com">
          kanjilens@gmail.com
        </a>
        .
      </p>
    </main>
  );
};

export default About;
