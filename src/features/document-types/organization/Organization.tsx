'use client'
import {useDBIndex} from "@/services/Search";
import {useAsyncEffect} from "@/hooks";
import {useEffect, useState} from "react";
import {Organisme} from "@/services/GraphQL";
import {LeafletMap} from "@/features/common/leaflet";
import L, {LatLng} from 'leaflet';
import {Coordinates} from "@/features/common/leaflet/LeafletMap";

type OrganizationDetailsProps = {
    language: string;
    segment: string;
    orgaslug: string;
}
export default function OrganizationDetails({ language, segment, orgaslug }: OrganizationDetailsProps) {

    const startingLatitude = 50.4520460341461;
    const startingLongitude = 3.9022238531303;
    const {isReady, getOrganisme} = useDBIndex(language);
    const [organization, setOrganization] = useState<Organisme>();
    const [boundsCoords, setBoundsCoords] = useState<L.LatLngBounds>();
    const [centerCoordinates, setCenterCoordinates] = useState<LatLng>();
    const [zoom, setZoom] = useState<number>(9);
    const [canRecenter, setCanRecenter] = useState<boolean>(true);
    const [currentLocation, setCurrentLocation] = useState<Coordinates | undefined>();

    useEffect( () => {
        setCenterCoordinates({lat: startingLatitude, lng: startingLongitude} as LatLng);
    }, [])

    useAsyncEffect(async () => {
        if(isReady){
            getOrganisme(orgaslug).then((orga) => {
                setOrganization(orga);
            }).catch(error => {
                console.error("Erreur lors de la récupération de l'organisme :", error);
            });
        }
    }, [isReady])

    return (
        <>
            <div className='page-container'>
                <div className="details-container">
                    <div className="details-container__header">
                        <div className='image-container'>
                            {
                                organization?.Logo?.data?.attributes?.url &&
                                <img src={organization?.Logo?.data?.attributes?.url} />
                            }
                        </div>
                        <h2>{organization?.Nom}</h2>
                        {organization?.Departement && <h3>{organization?.Departement}</h3>}
                    </div>
                    <div className="details-container__body">
                        <div className='intro'>
                            {organization?.Description}
                        </div>
                        <div className='contact'>
                            <h3>Contactez-nous</h3>
                            <ul>
                                <li>
                                    <i className='fa-regular fa-phone'></i>
                                    <span>{organization?.Telephone}</span>
                                </li>
                                <li>
                                    <i className='fa-regular fa-map-marker-alt'></i>
                                    <span>{organization?.Adresse}</span>
                                </li>
                                <li>
                                    <i className='fa-regular fa-envelope'></i>
                                    <span>{organization?.Email}</span>
                                </li>
                                <li>
                                    <i className='fa-regular fa-globe'></i>
                                    <span><a href='https://www.pcs-quaregnon.be'>{organization?.Website}</a></span>
                                </li>
                            </ul>
                        </div>
                        <div className='schedules'>
                            <h3>Horaires</h3>
                            {
                                organization?.Horaires
                            }
                        </div>
                        <div className='languages'>
                            <h3>Langues</h3>

                                <ul>

                                    {organization?.langues.data.map(item =>
                                        <li key={item.id}><span>{item.attributes.Nom}</span></li>)}
                                </ul>


                        </div>
                        <div className='access-conditions'>
                            <h3>Conditions d'accès</h3>
                            {
                                organization?.Conditions
                            }
                        </div>
                        <div className='map'>
                            <h3>Carte</h3>
                            <LeafletMap  boundsCoords={boundsCoords}
                                         currentLocation={currentLocation}
                                         centerCoordinates={centerCoordinates}
                                         setCenterCoordinates={setCenterCoordinates}
                                         zoom={zoom}
                                         setZoom={setZoom}
                                         canRecenter={canRecenter}
                                         setCanRecenter={setCanRecenter}/>
                        </div>
                        <div className='services'>
                            <h3>Services</h3>
                            <ul className='social-functions'>
                                <li>
                                    <i className='fa-regular fa-notes-medical'></i>
                                    <span>Assistance médicale d'urgence</span>
                                </li>
                                <li>
                                    <i className='fa-regular fa-notes-medical'></i>
                                    <span>Soins de santé primaires</span>
                                </li>
                                <li>
                                    <i className='fa-regular fa-notes-medical'></i>
                                    <span>Soutien psychosocial</span>
                                </li>
                                <li>
                                    <i className='fa-regular fa-notes-medical'></i>
                                    <span>Prévention et éducation sanitaire</span>
                                </li>
                                <li>
                                    <i className='fa-regular fa-notes-medical'></i>
                                    <span>Aide aux populations déplacées</span>
                                </li>
                                <li>
                                    <i className='fa-regular fa-notes-medical'></i>
                                    <span>Droits de l'homme et plaidoyer</span>
                                </li>
                                <li>
                                    <i className='fa-regular fa-notes-medical'></i>
                                    <span>Collecte de données et recherche</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="custom-shape-divider-bottom-1694936473">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                </svg>
            </div>
        </>
    );
}