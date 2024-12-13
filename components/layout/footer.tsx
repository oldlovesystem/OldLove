import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import * as Icon from "@phosphor-icons/react/dist/ssr";


const Footer = () => {
    return (
        <>
            <div id="footer" className="footer font-tenor-sans">
                <div className="footer-main bg-white mt-10 ">
                    <div className="container">
                        <hr className="mt-5" />
                        <div className="content-footer py-[60px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-1">
                            <div className="company-infor p-4 flex flex-col">
                                <p className="uppercase font-bold pb-3 ">Customer Care</p>
                                <div className="flex flex-col mt-3">
                                    <span className="text-button">Mail:</span>
                                    <span>support@oldlove.in</span>
                                </div>
                            </div>

                            {/* Get to Know Us Section */}
                            <div className="get-to-know-us p-4 flex flex-col">
                                <div className="uppercase font-bold pb-3">Get to know us</div>
                                <Link className="caption1 has-line-before duration-300 w-fit" href="/contact">Contact us</Link>
                                <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/my-account">My Account</Link>
                                <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/my-account">Order & Returns</Link>
                            </div>

                            {/* Customer Services Section */}
                            <div className="customer-services p-4 flex flex-col">
                                <div className="uppercase font-bold pb-3">Customer Services</div>
                                <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/policy">Shipping</Link>
                                <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/policy">Privacy Policy</Link>
                                <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/policy">Return & Refund</Link>
                            </div>

                            {/* Track/Return Exchange Order Section */}
                            <div className="track-return p-4 flex flex-col">
                                <div className="uppercase font-bold pb-3 font-tenor-sans ">TRACK OR RETURN/EXCHANGE ORDER</div>
                                <Link className="caption1 has-line-before duration-300 w-fit" href="/trackorder">Track Order</Link>
                                <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/returnexchange">Place Return/Exchange Request</Link>
                                <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/policy">Returns/Exchange Policy</Link>
                            </div>

                            {/* Newsletter Section */}
                            <div className="newsletter p-4 flex flex-col col-span-1 sm:col-span-2 lg:col-span-1">
                                <div className="uppercase font-bold pb-3 font-tenor-sans">Newsletter</div>
                                <div className="caption1 mt-3">Sign up for our newsletter and get 10% off your first purchase</div>
                                <div className="input-block w-full h-[52px] mt-4">
                                    <form className="w-full h-full relative" action="post">
                                        <input type="email" placeholder="Enter your e-mail" className="caption1 w-full h-full pl-4 pr-14 rounded-xl border-gray-300 border-line" required />
                                        <button className="w-[44px] h-[44px] bg-black flex items-center justify-center rounded-xl absolute top-1 right-1">
                                            <Icon.ArrowRight size={24} color="#fff" />
                                        </button>
                                    </form>
                                </div>
                                <div className="list-social flex items-center gap-6 mt-4">
                                    <Link href="https://www.facebook.com/people/Old-Love/61566655953803/" target="_blank">
                                    <Image width={25} height={25} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABeklEQVR4nO2ZvUoDURBGj734E+xUbGxsEvQNfAELwdLCSmzF1odIBAtfIY1RUBubBO3TphKsDf4UYpORhRG22fVml2zm6hxIdfcO32Em924IOP+TBnAK3ANPwAcgwDswBJ6BAfAIXAGHGGMTuNXQ43y+MMQB8KnBXoEzYAdYA2b1mTlgEVgF6sB2SsYE+6lALWB+jL1iRaSe6sRRgf1iReRSg5wX3C8WRDaAkZ5KSzGLnGiIixI1xILIjYbYy3lmBWjrHZJ3BE+VgYZYz5F4CbhHukyZoQZZyFhv6/o1sIxhRhp0JmP9Z5xMSxAw3ybmPwQXsYbENFoPAcdnFqGv8d0qRMqE6AWKvFUpMgm2tHafyEV2tXaHyEWOtXaTyEWaWjsRilqko7WTEYtapK+1ky/9xPnt6EyO2DJ3kAC1KkRC7oIsQiTuMEBUryh5uIg1xEfLGOIdMYZ4R4wh3hFjiHfEGOIdMYZ4R4whf60jUvCnsBl6Mfw/6FAB33N7InpSipjwAAAAAElFTkSuQmCC" alt="facebook-f"/>


                                    </Link>
                                    <Link href="https://www.instagram.com/oldlove.in/?igsh=MTE4bHNuZXk1d2Y3aA%3D%3D" target="_blank">
                                    <Image width={25} height={25} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADK0lEQVR4nO2ZO09UQRTHfwUqRB67lksrgrEQBTsfsZOYqHwCQlS+gApS+2iNhFKDX0AxsZLFZ6f2Itio2AoKCBWuOcn/JhMDu3Mfu3NN9p9McrP3nHPn7Jz3QBNN5AK9wAQwDywAG0Alo2WyTGYZGAcO1UOBQeBFhpv2XfPAQBYK7AGmgT8S/AN4AFzQ6ewnO5gsk3kReKhvVfTtKaAlqeAi8FLCfgO3gE4ah07gNrDpnE4hyUlEpvRdphUKR4Ev2ssbYG8c5mkxfgNKhEcJWNae7vsyDcouzZyOkR8cl5lt67kmIpMyn8gb7mhvFqKroteJTo107Ajn5ZNmRkM7vO8CVrTHnmqCJkRk4S8Elp0cYv65E2b0/kY1QWURWSzPqyLDej9XTdCiiNKUB5Z/RoGnwCeVHht6ntU7o9kJQ1LGlDhXw/xN3q5YE1FHAgXagEngp0fpsQrcBFoTfKdDMmyvuyL6UJI4/8Hhfw5cccoYW336bc6he58wT1Vq7TOJIiWZQnTcJz14TjlmnCTpVrJWpM05iVcxayHzk9fifRfTzCpZKzIp+oUkBZ2UiU7GQn8QRYqOY/uY02444wSAYghFRh3HTosof42EUGRWtJdJj6uS9TiEIpFtW4hNiz6fJFcvRdZF2056tEvW+v+uSKdk/fKkb5pWNWe3siMtxkI6+6hPOe2J+ZDht6gkZvSnSY6zTkIshC5RFmNkZRfGs+TT8dVbkVaV4hUVgHGUOQC8zUvR+G8Zv6TaycecPuepjI9Q0r8a8ZcViQ4rz7Trecxx7Ogk6tJYraVodVtViq96trp2dbCvXq3uYgbDh4LC6BP1KetaC/ptJGHvEmv4EHoc5INhn/ZhPPCAzgePtMdreR6Z1oL3yBQnqtglS95wN05XOqBrhU3f8X2DMAhs6Vqh35dpSprb+LKb8Oh25sL34jC2OCZmY/4ThEM/8NVJtLEvRQuOMpu6ZDFnaxS65BNbTruQOP+06M5uW8JWdD9xSQODLNrcCCarT3lixolO2zKnxNfTLo4AzzxKj6xXuV4Bp0d9w5xTfmS1aZP1UaH1OnCwHgo00QTx8Bf0wax6bwlEYQAAAABJRU5ErkJggg==" alt="instagram-new--v1"/>

                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Footer Bottom Section */}
                        <div className="footer-bottom py-3 flex items-center justify-between gap-5 max-lg:justify-center max-lg:flex-col border-t border-line">
                            <div className="left flex items-center gap-8">
                                <div className="copyright caption1 text-secondary">©2024 OldLove. All Rights Reserved.</div>
                                <div className="select-block flex items-center gap-5 max-md:hidden">
                                    <div className="choose-language flex items-center gap-1.5">
                                        <select name="language" id="chooseLanguageFooter" className="caption2 bg-transparent">
                                            <option value="English">English</option>
                                        </select>
                                        <Icon.CaretDown size={12} color="#1F1F1F" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
