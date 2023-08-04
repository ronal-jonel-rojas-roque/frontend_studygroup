import "../../common/styled-contact.css";

import React, { useEffect, useRef } from "react";

const loadGoogleMaps = () => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC49HmORB9g_J8_SSRhXMxveYoO2__USe8&callback=initMap`;
        script.async = true;
        script.defer = true;
        window.initMap = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
};

const LocationModal = ({ modalShow, onClose }) => {
    const mapRef = useRef(null);
    const modalRef = useRef(null);

    const handleCloseClick = () => {
        onClose();
    };


    useEffect(() => {
        let map;
        const initMap = () => {
            map = new window.google.maps.Map(mapRef.current, {
                center: { lat: -9.9321059, lng: -76.2453894 },
                zoom: 15,
            });
            const marker = new window.google.maps.Marker({
                position: { lat: -9.9321059, lng: -76.2453894 },
                map: map,
                title: "Ubicación predefinida",
            });
        };
        if (modalShow) {
            loadGoogleMaps()
                .then(initMap)
                .catch((error) => {
                    console.error("Error al cargar Google Maps:", error);
                });
        }
    }, [modalShow]);

    return (
        <div className={`modal1 ${modalShow ? "show" : "hide"}`} ref={modalRef}>
            <div className="modal-background" />
            <div className="modal-content">
                <h2 className="modal-title">Ubicación</h2>
                <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
                <button className="modal-close-icon" onClick={handleCloseClick}>
                    X
                </button>
            </div>
        </div>
    );
};

export default LocationModal;