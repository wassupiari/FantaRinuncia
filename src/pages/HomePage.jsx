import React from 'react'
import NavbarSimple from "../components/navbar.jsx"
import Footer from "../components/footer.jsx"
import {version} from "../../package.json"
import '../index.css'



const HomePage = () => {

    return (


        <div>
            <NavbarSimple/>


            <div
                className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')]">
                <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">

                    <div className="flex justify-center">
                        <a className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 p-1 ps-3 rounded-full transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                           href="#">
                            version: {version}
                            <span
                                className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-400">
          <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
               viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
               strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </span>
                        </a>
                    </div>


                    <div className="mt-5 max-w-2xl text-center mx-auto">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor"
                             className="mx-auto h-auto w-6 md:w-11 text-gray-800 dark:text-gray-200">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"/>
                        </svg>
                        <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200">
                            Crea la tua
                            <span
                                className="bg-clip-text bg-gradient-to-tl ml-2 from-indigo-400 to-indigo-600 text-transparent">Squadra!
                            </span>
                        </h1>
                    </div>


                    <div className="mt-8 gap-3 flex justify-center">

                        <p className="text-lg text-gray-600 dark:text-gray-400">Pronto ad indovinare chi lascerà gli
                            studi per primo?</p>
                    </div>


                    <div className="mt-8 gap-3 flex justify-center">
                        <button
                            className="align-middle select-none font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-indigo-900 text-white shadow-md shadow-indigo-900/10 hover:shadow-lg hover:shadow-indigo-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
                            type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"/>
                            </svg>
                            Inizia adesso!
                        </button>
                    </div>

                </div>
            </div>


            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

                <div className="mx-auto max-w-2xl mb-8 lg:mb-14 text-center">
                    <h2 className="text-3xl lg:text-4xl text-gray-800 font-bold dark:text-gray-200">
                        Features
                    </h2>
                    <p className="mt-3 text-gray-800 dark:text-gray-200">
                        Impegni nel formare la tua squadra al resto ci pensiamo noi.
                    </p>
                </div>

                <div className="mx-auto max-w-3xl grid grid-cols-12 gap-6 lg:gap-8">
                    <div className="col-span-6 sm:col-span-4 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor"
                             className="mx-auto h-auto w-7 md:w-9 text-gray-800 dark:text-gray-200">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/>
                        </svg>
                        <div className="mt-2 sm:mt-6">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                Scala la classifica!
                            </h3>
                        </div>
                    </div>

                    <div className="col-span-6 sm:col-span-4 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor"
                             className="mx-auto h-auto w-7 md:w-9 text-gray-800 dark:text-gray-200">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/>
                        </svg>
                        <div className="mt-2 sm:mt-6 mx-auto space-x-3">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mx-auto mb-2">
                                Guadagna badge fantastici!
                                <br/>
                            </h3>
                            <span
                                className=" inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">noobie</span>
                            <span
                                className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">top G</span>
                            <span
                                className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">sfigato</span>
                        </div>
                    </div>

                    <div className="col-span-6 col-start-4 sm:col-span-4 text-center mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor"
                             className="mx-auto h-auto w-7 md:w-9 text-gray-800 dark:text-gray-200">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"/>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"/>
                        </svg>
                        <div className="mt-2 sm:mt-6">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                Domina la tua lega!
                            </h3>
                        </div>
                    </div>

                </div>
            </div>

            <div className="bg-white py-24 sm:py-32 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
                        Made with this technologies:</h2>
                    <div
                        className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:grid-cols-4 ">
                        <div className="relative">
                            <img
                                className="col-span-1 max-h-12 w-full object-contain lg:col-span-1 transition-transform transform hover:scale-110 drop-shadow-xl"
                                src="https://skillicons.dev/icons?i=react" alt="Transistor"/>
                        </div>
                        <div className="relative">
                            <img
                                className="col-span-1 max-h-12 w-full object-contain lg:col-span-1 transition-transform transform hover:scale-110 drop-shadow-xl"
                                src="https://skillicons.dev/icons?i=flask" alt="Transistor"/>
                        </div>
                        <div className="relative">
                            <img
                                className="col-span-1 max-h-12 w-full object-contain lg:col-span-1 transition-transform transform hover:scale-110 drop-shadow-xl"
                                src="https://skillicons.dev/icons?i=postgres" alt="Transistor"/>
                        </div>
                        <div className="relative">
                            <img
                                className="col-span-1 max-h-12 w-full object-contain lg:col-span-1 transition-transform transform hover:scale-110 drop-shadow-xl"
                                src="https://skillicons.dev/icons?i=tailwind" alt="Transistor"/>
                        </div>
                    </div>
                </div>
            </div>


            <Footer/>

        </div>
    )
        ;
};

export default HomePage;
