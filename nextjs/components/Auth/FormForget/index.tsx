const FormForget = () => {
    return <form id="auth-forget">
        <h1>Esqueci a senha</h1>

        <hr />

        <div className="loading-wrap">
            <div className="loading">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p>Por favor, aguarde...</p>
        </div>

        <div className="message">
            <img src="/images/check-circle.svg" alt="Ok" />
            <span>Verifique as instruções no seu e-mail.</span>
        </div>
    </form>
}
export default FormForget;