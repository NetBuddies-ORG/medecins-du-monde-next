export async function CustomFooter() {
    return (
        <>
            <div className='footer'>
                {/*<img src='./styles/assets/images/svg-shape/blob-1.svg' className=' blob blob-1' />*/}
                {/*    <img src='./styles/assets/images/svg-shape/blob-2.svg'  className='blob blob-2' />*/}
                {/*        <img src='./styles/assets/images/svg-shape/blob-3.svg'  className='blob blob-3' />*/}
                            <div className="content">
                                <div className="services">
                                    <h4>Services</h4>
                                    <p><a href="#">App development</a></p>
                                    <p><a href="#">Web development</a></p>
                                    <p><a href="#">DevOps</a></p>
                                    <p><a href="#">Web designing</a></p>
                                </div>
                                <div className="social-media">
                                    <h4>Social</h4>
                                    <p>
                                        <a href="#"
                                        ><i className="fab fa-linkedin"></i> Linkedin</a
                                        >
                                    </p>
                                    <p>
                                        <a href="#"
                                        ><i className="fab fa-twitter"></i> Twitter</a
                                        >
                                    </p>
                                    <p>
                                        <a href="https://github.com/farazc60"
                                        ><i className="fab fa-github"></i> Github</a
                                        >
                                    </p>
                                    <p>
                                        <a href="https://www.facebook.com/codewithfaraz"
                                        ><i className="fab fa-facebook"></i> Facebook</a
                                        >
                                    </p>
                                    <p>
                                        <a href="https://www.instagram.com/codewithfaraz"
                                        ><i className="fab fa-instagram"></i> Instagram</a
                                        >
                                    </p>
                                </div>
                                <div className="links">
                                    <h4>Quick links</h4>
                                    <p><a href="#">Home</a></p>
                                    <p><a href="#">About</a></p>
                                    <p><a href="#">Blogs</a></p>
                                    <p><a href="#">Contact</a></p>
                                </div>
                                <div className="details">
                                    <h4 className="address">Address</h4>
                                    <p>Rue Botanique 75, 1210 Bruxelles</p>
                                    <h4 className="mobile">Mobile</h4>
                                    <p><a href="#">+32 (0) 2 225 43 00</a></p>
                                    <h4 className="mail">Email</h4>
                                    <p><a href="#">info@medecinsdumonde.be</a></p>
                                </div>
                            </div>
                            <footer>
                                <hr />
                                © 2023 MonBo Réseau.
                            </footer>
            </div>
        </>
    )
}