const FormReset = () => {
    return <form id="auth-reset" className="forget">
        <h1>Redefinir senha</h1>

        <hr />

        <div className="field">
            <input type="password" name="password" id="password_reset" />
            <label htmlFor="password_reset">Crie uma Nova Senha</label>
        </div>

        <div className="actions">
            <button type="submit">Redefinir</button>
        </div>
    </form>
}

export default FormReset;