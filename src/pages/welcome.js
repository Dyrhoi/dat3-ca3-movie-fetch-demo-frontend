function Welcome() {
    return (
        <div>
            <h1>
                Welcome to your Front-End startcode
            </h1>
            <p className="text-start fw-bold text-decoration-underline">
                A few steps to get you started
            </p>
            <p className="lh-sm">
                <p className="fst-italic fw-bold">
                    Pages
                </p>
                <p className="fw-normal">
                    In the pages folder you simply need to change the URL link, so that the corresponding page fetches the right content.
                </p>
            </p>
            <p className="lh-sm">
                <p className="fst-italic fw-bold">
                    Settings
                </p>
                <p className="fw-normal">
                    In the settings file you need to change the URL link to your own user API.
                </p>
            </p>
        </div>
    )
}

export default Welcome;