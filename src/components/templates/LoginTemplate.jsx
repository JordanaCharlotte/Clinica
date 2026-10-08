function LoginTemplate(props) {
    return (
        <>
            <h2 className="mb-4 text-center">Iniciar Sesion</h2>
            {props.children}
        </>
    );
}

export default LoginTemplate;