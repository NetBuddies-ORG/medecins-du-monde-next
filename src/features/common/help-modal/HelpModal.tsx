import {FaTimes} from "react-icons/fa";
import {FaArrowLeftLong, FaArrowRightLong} from "react-icons/fa6";
import {useState} from "react";
import {GetHelpQuery} from "@/services/GraphQL";
import { motion } from "framer-motion";

interface HelpModalProps {
    closeModal: () => void;
    help: GetHelpQuery["help"]
}

export function HelpModal({help, closeModal}: HelpModalProps) {
    const [currentStep, setCurrentStep] = useState<number>(0);

    function handleClose() {
        closeModal();
    }

    function handlePreviousStep() {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    function handleNextStep() {
        if (currentStep < help.data.attributes.Page.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    return <>
        <motion.div animate={{ opacity: 0.65 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="help-modal-bg">
        </motion.div>
        <motion.div animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="help-modal-container">
            <button className="modal-close" onClick={handleClose}><FaTimes/></button>
            <div className="page-container">
                <div className="details-container__body">
                    <div className="modal-stepper">
                        {
                            help.data.attributes.Page.map((item, index) => {
                                return <div key={index} className="modal-step">
                                    {
                                        currentStep === index &&
                                        <div dangerouslySetInnerHTML={{__html: item.Contenu}}></div>
                                    }
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="bullets">
                {
                    help.data.attributes.Page.map((item, index) => {
                        return <div key={index} className={`bullet ${currentStep === index ? 'active' : ''}`}
                                    onClick={() => setCurrentStep(index)}></div>
                    })
                }
            </div>
            <button className={"modal-control modal-previous" + (currentStep === 0 ? " disabled" : "")}
                    onClick={handlePreviousStep}>
                <FaArrowLeftLong/>
            </button>
            <button className={"modal-control modal-next" + (currentStep === help.data.attributes.Page.length - 1 ? " disabled" : "")}
                onClick={handleNextStep}>
                <FaArrowRightLong/>
            </button>
        </motion.div>
    </>
}
