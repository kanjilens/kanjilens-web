import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@features/iam/hooks/useAuth";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Typography } from "@components/ui/Typography";
import { SimpleToast } from "@components/ui/Global/SimpleToast";
import TextInput from "@components/ui/Input/Generic";

type FormProps = z.infer<typeof LoginFormSchema>;

const LoginFormSchema = z.object({
  email: z.email("Formato de email inválido"),
  password: z
    .string()
    .min(5, "Senha deve ter no mínimo 5 caracteres"),
});

const Login = () => {
  const { login, isAuthenticated, addToast } = useAuth();
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
    resolver: zodResolver(LoginFormSchema),
  });

  const handleLogin = async (data: FormProps) => {
    try {
      const response = await login(data);
      if (response) {
        addToast?.(
          "Login realizado com sucesso",
          "success",
        );
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (err) {
      console.error("Erro ao realizar login:", err);
    }
  };
  return (
    <form
      className="wrap"
      onSubmit={handleSubmit(handleLogin)}
    >
      <Typography
        variant="h2"
        as={"h1"}
        className=" text-2xl mb-1"
      >
        Bem vindo de volta!
      </Typography>
      <Typography
        variant="subtitle"
        as={"h2"}
        className=" text-[14px] mb-6"
      >
        Use os dados preenchidos ou digite qualquer
        credencial para acessar a demo.
      </Typography>
      <div className="flex flex-col gap-4">
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
          type="password"
          name="password"
          labelComplement={
            <a className="text-[14px] text-[#0D9488] cursor-pointer">
              Esqueci minha senha
            </a>
          }
          label="Senha"
          placeholder="Insira o sua senha"
          icon="mail"
          required
          control={control as any}
        />
        <TextInput
          type="submit"
          name="submit"
          variant="submit"
          label="Realizar Login"
          hiddenLabel
          value={isSubmitting ? "Entrando..." : "Entrar"}
          disabled={isSubmitting}
          control={control as any}
        />
      </div>
      <SimpleToast
        information="Dica: a próxima tela já abre com os kanjis de hoje, recentes e sua enciclopédia de consulta."
        status="success"
      />
    </form>
  );
};
export default Login;
