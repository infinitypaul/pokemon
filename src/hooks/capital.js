import  { useState, useEffect } from 'react';

export const useCapitalFirst = (val) => {
    const [value, setValue] = useState(null);
    setValue(val);
        value.toLowerCase()
            .split('-')
            .map(s => s.charAt(0)
                .toUpperCase()+ s.substring(1))
            .join(" ");



    return 'dd';
};