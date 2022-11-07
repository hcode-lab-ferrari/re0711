const FormEmail = () => {
    return <form id="auth-email">
        <h1>Autenticação</h1>

        <hr />

        <div className="field">
            <input type="email" name="email" id="email" />
            <label htmlFor="email">E-mail</label>
        </div>

        <div className="actions">
            <a href="auth.html#register" className="link">Criar uma Conta</a>
            <button type="submit">Próxima</button>
        </div>
    </form>
}

export default FormEmail;