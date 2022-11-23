import { NextPage } from "next";
import Link from "next/link";
import FormEmail from "../components/Auth/FormEmail";
import FormForget from "../components/Auth/FormForget";
import FormLogin from "../components/Auth/FormLogin";
import FormRegister from "../components/Auth/FormRegister";
import FormReset from "../components/Auth/FormReset";
import { useAuth } from "../contexts/AuthContext";

const ComponentPage: NextPage = () => {

  const { currentForm } = useAuth();

  return <main id="auth">
    <section>
      <Link href="/">
        <a><img src="/images/ferrari-logo.svg" alt="Logo Ferrari"
        /></a>
      </Link>
      {currentForm === 'email' && <FormEmail />}
      {currentForm === 'login' && <FormLogin />}
      {currentForm === 'register' && <FormRegister />}
      {currentForm === 'forget' && <FormForget />}
      {currentForm === 'reset' && <FormReset />}
      <p>2020 © Hcode. All rights reserved.</p>
    </section>
  </main>
}

export default ComponentPage;