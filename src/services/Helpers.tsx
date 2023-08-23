export const appendToFormData = (data: { [key: string]: unknown }) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as "string | Blob");
    });
    return formData;
};

export const differenceTwoDates=(date1:string,date2:string)=>{
    const [initialDate, finalDate] = [
        new Date(date1) as unknown as number,
        new Date(date2) as unknown as number,
    ];
    return (finalDate - initialDate) / 86400000;
};