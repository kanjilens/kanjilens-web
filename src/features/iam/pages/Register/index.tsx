import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@features/iam/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Typography } from "@components/ui/Typography";
import { SimpleToast } from "@components/ui/Global/SimpleToast";
import TextInput from "@components/ui/Input/Generic";

type FormProps = z.infer<typeof RegisterUserFormSchema>;

const RegisterUserFormSchema = z
  .object({
    name: z.string().min(1, "O nome é obrigatório"),
    email: z.email("Formato de email inválido"),
    password: z
      .string()
      .min(8, "Senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z
      .string()
      .min(8, "Senha deve ter no mínimo 8 caracteres"),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "As senhas não coincidem",
    },
  );

const Register = () => {
  const { isAuthenticated, register, addToast } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormProps>({
    resolver: zodResolver(RegisterUserFormSchema),
  });

  const handleRegister = async (data: FormProps) => {
    try {
      //   const response = await register(data);
      console.log(data);
      await register({
        displayName: data.name,
        email: data.email,
        password: data.password,
      });
      //   if (response) {
      addToast?.(
        "Registro realizado com sucesso!",
        "success",
      );
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      console.error("Erro durante o registro:", err);
    }
  };

  return (
    <form
      className="wrap"
      onSubmit={handleSubmit(handleRegister)}
    >
      <Typography
        variant="h2"
        as={"h1"}
        className="text-lg lg:text-2xl mb-1"
      >
        Crie sua conta
      </Typography>
      <Typography
        as={"h2"}
        className="text-sm lg:text-[14px] mb-6 leading-[20px] lg:leading-[24px] text-[#6B7280]"
      >
        Preencha seus dados para iniciar a demo e organizar
        seus estudos de japonês.
      </Typography>
      <div className="flex flex-col gap-4">
        <TextInput
          type="text"
          name="name"
          placeholder="Nome de Usuário"
          label="Nome"
          icon="person"
          required
          control={control as any}
        />
        <TextInput
          type="email"
          name="email"
          label="E-mail"
          placeholder="Insira o seu login"
          icon="mail"
          required
          control={control as any}
        />
        <TextInput
          name="password"
          type="password"
          label="Senha"
          placeholder="Insira o sua senha"
          icon="lock"
          required
          control={control as any}
        />
        <TextInput
          name="confirmPassword"
          type="password"
          label="Confirmar senha"
          placeholder="Confirme sua senha"
          icon="lock"
          required
          control={control as any}
        />
        <TextInput
          type="submit"
          name="submit"
          variant="submit"
          label="Registrar e Entrar"
          hiddenLabel
          value={
            isSubmitting
              ? "Entrando..."
              : "Criar conta e Entrar"
          }
          disabled={isSubmitting}
          control={control as any}
        />
      </div>
      <SimpleToast
        information="Ao cadastrar, você entra direto na demo com dados locais e pode testar o gerenciamento de kanjis."
        status="success"
      />
    </form>
  );
};
export default Register;
