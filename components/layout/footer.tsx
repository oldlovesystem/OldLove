"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Icon from '@phosphor-icons/react/dist/ssr';
const Footer = () => {
  return (
    <>
      <div id="footer" className="footer font-tenor-sans">
        <div className="footer-main mt-10 bg-white">
          <div className="container">
            <hr className="mt-5" />
            <div className="content-footer grid grid-cols-1 gap-1 py-[60px] sm:grid-cols-2 lg:grid-cols-5">
              <div className="company-infor flex flex-col p-4">
                <p className="pb-3 font-bold uppercase">Customer Care</p>
                <div className="mt-3 flex flex-col">
  <span className="text-button">Mail:</span>
  <button 
    onClick={() => window.location.href = 'mailto:support@oldlove.in'} 
    className="text-blue-500 underline"
  >
    support@oldlove.in
  </button>
</div>
              </div>

              {/* Get to Know Us Section */}
              <div className="get-to-know-us flex flex-col p-4">
                <div className="pb-3 font-bold uppercase">Get to know us</div>
                <Link className="caption1 has-line-before w-fit duration-300" href="/contact">
                  Contact us
                </Link>
                <Link
                  className="caption1 has-line-before w-fit pt-2 duration-300"
                  href="/my-account"
                >
                  My Account
                </Link>
                <Link
                  className="caption1 has-line-before w-fit pt-2 duration-300"
                  href="/my-account"
                >
                  Order & Returns
                </Link>
              </div>

              {/* Customer Services Section */}
              <div className="customer-services flex flex-col p-4">
                <div className="pb-3 font-bold uppercase">Customer Services</div>
                <Link className="caption1 has-line-before w-fit pt-2 duration-300" href="/policy">
                  Shipping
                </Link>
                <Link className="caption1 has-line-before w-fit pt-2 duration-300" href="/policy">
                  Privacy Policy
                </Link>
                <Link className="caption1 has-line-before w-fit pt-2 duration-300" href="/policy">
                  Return & Refund
                </Link>
              </div>

              {/* Track/Return Exchange Order Section */}
              <div className="track-return flex flex-col p-4">
                <div className="font-tenor-sans pb-3 font-bold uppercase">
                  TRACK OR RETURN/EXCHANGE ORDER
                </div>
                <Link className="caption1 has-line-before w-fit duration-300" href="/trackorder">
                  Track Order
                </Link>
                <Link
                  className="caption1 has-line-before w-fit pt-2 duration-300"
                  href="/returnexchange"
                >
                  Place Return/Exchange Request
                </Link>
                <Link className="caption1 has-line-before w-fit pt-2 duration-300" href="/policy">
                  Returns/Exchange Policy
                </Link>
              </div>

              {/* Newsletter Section */}
              <div className="newsletter col-span-1 flex flex-col p-4 sm:col-span-2 lg:col-span-1">
                <div className="font-tenor-sans pb-3 font-bold uppercase">Newsletter</div>
                <div className="caption1 mt-3">
                  Sign up for our newsletter and get 10% off your first purchase
                </div>
                <div className="input-block mt-4 h-[52px] w-full">
                  <form className="relative h-full w-full" action="post">
                    <input
                      type="email"
                      placeholder="Enter your e-mail"
                      className="caption1 border-line h-full w-full rounded-xl border-gray-300 pl-4 pr-14"
                      required
                    />
                    <button className="absolute right-1 top-1 flex h-[44px] w-[44px] items-center justify-center rounded-xl bg-black">
                      <Icon.ArrowRight size={24} color="#fff" />
                    </button>
                  </form>
                </div>
                <div className="list-social mt-4 flex items-center gap-6">
                  <Link
                    href="https://www.facebook.com/people/Old-Love/61566655953803/"
                    target="_blank"
                  >
                    <Image
                      width={25}
                      height={25}
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABeklEQVR4nO2ZvUoDURBGj734E+xUbGxsEvQNfAELwdLCSmzF1odIBAtfIY1RUBubBO3TphKsDf4UYpORhRG22fVml2zm6hxIdfcO32Em924IOP+TBnAK3ANPwAcgwDswBJ6BAfAIXAGHGGMTuNXQ43y+MMQB8KnBXoEzYAdYA2b1mTlgEVgF6sB2SsYE+6lALWB+jL1iRaSe6sRRgf1iReRSg5wX3C8WRDaAkZ5KSzGLnGiIixI1xILIjYbYy3lmBWjrHZJ3BE+VgYZYz5F4CbhHukyZoQZZyFhv6/o1sIxhRhp0JmP9Z5xMSxAw3ybmPwQXsYbENFoPAcdnFqGv8d0qRMqE6AWKvFUpMgm2tHafyEV2tXaHyEWOtXaTyEWaWjsRilqko7WTEYtapK+1ky/9xPnt6EyO2DJ3kAC1KkRC7oIsQiTuMEBUryh5uIg1xEfLGOIdMYZ4R4wh3hFjiHfEGOIdMYZ4R4whf60jUvCnsBl6Mfw/6FAB33N7InpSipjwAAAAAElFTkSuQmCC"
                      alt="facebook-f"
                    />
                  </Link>
                  <Link
                    href="https://www.instagram.com/oldlove.in/?igsh=MTE4bHNuZXk1d2Y3aA%3D%3D"
                    target="_blank"
                  >
                    <Image
                      width={25}
                      height={25}
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADK0lEQVR4nO2ZO09UQRTHfwUqRB67lksrgrEQBTsfsZOYqHwCQlS+gApS+2iNhFKDX0AxsZLFZ6f2Itio2AoKCBWuOcn/JhMDu3Mfu3NN9p9McrP3nHPn7Jz3QBNN5AK9wAQwDywAG0Alo2WyTGYZGAcO1UOBQeBFhpv2XfPAQBYK7AGmgT8S/AN4AFzQ6ewnO5gsk3kReKhvVfTtKaAlqeAi8FLCfgO3gE4ah07gNrDpnE4hyUlEpvRdphUKR4Ev2ssbYG8c5mkxfgNKhEcJWNae7vsyDcouzZyOkR8cl5lt67kmIpMyn8gb7mhvFqKroteJTo107Ajn5ZNmRkM7vO8CVrTHnmqCJkRk4S8Elp0cYv65E2b0/kY1QWURWSzPqyLDej9XTdCiiNKUB5Z/RoGnwCeVHht6ntU7o9kJQ1LGlDhXw/xN3q5YE1FHAgXagEngp0fpsQrcBFoTfKdDMmyvuyL6UJI4/8Hhfw5cccoYW336bc6he58wT1Vq7TOJIiWZQnTcJz14TjlmnCTpVrJWpM05iVcxayHzk9fifRfTzCpZKzIp+oUkBZ2UiU7GQn8QRYqOY/uY02444wSAYghFRh3HTosof42EUGRWtJdJj6uS9TiEIpFtW4hNiz6fJFcvRdZF2056tEvW+v+uSKdk/fKkb5pWNWe3siMtxkI6+6hPOe2J+ZDht6gkZvSnSY6zTkIshC5RFmNkZRfGs+TT8dVbkVaV4hUVgHGUOQC8zUvR+G8Zv6TaycecPuepjI9Q0r8a8ZcViQ4rz7Trecxx7Ogk6tJYraVodVtViq96trp2dbCvXq3uYgbDh4LC6BP1KetaC/ptJGHvEmv4EHoc5INhn/ZhPPCAzgePtMdreR6Z1oL3yBQnqtglS95wN05XOqBrhU3f8X2DMAhs6Vqh35dpSprb+LKb8Oh25sL34jC2OCZmY/4ThEM/8NVJtLEvRQuOMpu6ZDFnaxS65BNbTruQOP+06M5uW8JWdD9xSQODLNrcCCarT3lixolO2zKnxNfTLo4AzzxKj6xXuV4Bp0d9w5xTfmS1aZP1UaH1OnCwHgo00QTx8Bf0wax6bwlEYQAAAABJRU5ErkJggg=="
                      alt="instagram-new--v1"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer Bottom Section */}
            <div className="footer-bottom border-line flex items-center justify-between gap-5 border-t py-3 max-lg:flex-col max-lg:justify-center">
              <div className="left flex items-center gap-8">
                <div className="copyright caption1 text-secondary">
                  ©2024 OldLove. All Rights Reserved.
                </div>
                <div className="select-block flex items-center gap-5 max-md:hidden">
                  <div className="choose-language flex items-center gap-1.5">
                    <select
                      name="language"
                      id="chooseLanguageFooter"
                      className="caption2 bg-transparent"
                    >
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
