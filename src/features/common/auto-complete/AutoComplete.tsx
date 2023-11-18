import React, { useState } from 'react';

export default function AutoComplete() {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isSuggestionsVisible, setIsSuggestionsVisible] = useState<boolean>(false);

    const handleInputChange = (event) => {
        console.log(event.target.value)
        const value = event.target.value;
        setInputValue(value);
        setSuggestions(['iuhiuh']);

        // Ajoutez ici la logique pour récupérer les suggestions en fonction de la valeur de l'input
        // Exemple: appel à une API, recherche dans une liste, etc.
        // Mettez à jour le state des suggestions en conséquence.
    };

    return (<>
        <div className="help-modal-bg"></div>
        <div style={{ position: 'relative', zIndex: 100000 }}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Rechercher..."
            />

            {/* Affichez le menu de résultats ici */}
            {suggestions.length > 0 && (
                <ul
                    style={{
                        listStyleType: 'none',
                        padding: '0',
                        margin: '0',
                        position: 'absolute',
                        top: '48px', // Ajustez la position verticale en fonction de vos besoins
                        left: '0',
                        width: '100%',
                        zIndex: 100000,
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '0 0 4px 4px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {suggestions.map((suggestion, index) => (
                        <li key={index} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </>);
};