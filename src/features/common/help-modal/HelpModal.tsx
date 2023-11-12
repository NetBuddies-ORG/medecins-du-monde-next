import {FaTimes} from "react-icons/fa";
import {FaArrowLeftLong, FaArrowRightLong} from "react-icons/fa6";
import {useState} from "react";
import noResultImage from '@/assets/utils/images/no-results.jpg'
import Image from "next/image";

interface HelpModalProps {
    closeModal: () => void;
}

export function HelpModal({closeModal}: HelpModalProps){
    const [currentStep, setCurrentStep] = useState<number>(0);

    function handleClose() {
        closeModal();
    }

    function handlePreviousStep() {
        if(currentStep > 0){
            setCurrentStep(currentStep - 1)
        }
    }

    function handleNextStep() {
        if(currentStep < 2){
            setCurrentStep(currentStep + 1)
        }
    }

    return <>
        <div className="help-modal-bg"></div>
        <div className="help-modal-container">
            <button className="modal-close" onClick={handleClose}><FaTimes /></button>
            <div className="modal-stepper">
                {currentStep === 0 &&
                    <div className="modal-step">
                        <h4>{"Bienvue sur l'outil Monbo Réseau"}</h4>
                        <div className="modal-step__body">
                            <div className="image-container">
                                <Image
                                    src={noResultImage}
                                    className="image"
                                    width={100}
                                    height={100}
                                    alt="Aucun résultat"/>
                            </div>
                            <p>{"Cet outil vous permet de trouver rapidement et facilement les services et organismes qui peuvent vous aider."}</p>
                            <p>{"Pour commencer, sélectionnez un public spécifique ou une catégorie de service."}</p>
                        </div>
                    </div>
                }
                {currentStep === 1 &&
                    <div className="modal-step">
                        <h4>{"Bienvue sur l'outil Monbo Réseau"}</h4>
                        <div className="modal-step__body">
                            <p>{"Cet outil vous permet de trouver rapidement et facilement les services et organismes qui peuvent vous aider."}</p>
                            <div className="image-container">
                                <Image
                                    src={noResultImage}
                                    className="image"
                                    width={100}
                                    height={100}
                                    alt="Aucun résultat"/>
                            </div>
                            <p>{"Pour commencer, sélectionnez un public spécifique ou une catégorie de service."}</p>
                        </div>
                    </div>
                }
                {currentStep === 2 &&
                    <div className="modal-step">
                        <h4>{"Bienvue sur l'outil Monbo Réseau"}</h4>
                        <div className="modal-step__body">
                            <p>{"Cet outil vous permet de trouver rapidement et facilement les services et organismes qui peuvent vous aider."}</p>
                            <p>{"Pour commencer, sélectionnez un public spécifique ou une catégorie de service."}</p>
                            <div className="image-container">
                                <Image
                                    src={noResultImage}
                                    className="image"
                                    width={100}
                                    height={100}
                                    alt="Aucun résultat"/>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="bullets">
                <div className={`bullet ${currentStep === 0 ? 'active' : ''}`}></div>
                <div className={`bullet ${currentStep === 1 ? 'active' : ''}`}></div>
                <div className={`bullet ${currentStep === 2 ? 'active' : ''}`}></div>
            </div>
            <button className={"modal-control modal-previous" + (currentStep === 0 ? " disabled" : "")} onClick={handlePreviousStep}><FaArrowLeftLong /></button>
            <button className={"modal-control modal-next" + (currentStep === 2 ? " disabled" : "")} onClick={handleNextStep}><FaArrowRightLong /></button>
        </div>
    </>
}