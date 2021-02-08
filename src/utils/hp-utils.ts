export const houseCodeToName = (houseCode: string) => {
    const translatedHouseCode = houseCode.toLocaleLowerCase();
    return {
        'hufflepuff': 'Lufa-Lufa',
        'gryffindor': 'Grifinória',
        'slytherin': 'Sonserina',
        'ravenclaw': 'Corvinal'
    }[translatedHouseCode]
}

export const bloodTypeToName = (bloodType: string) => {
    return {
        'MIXED': 'Mestiço',
        'MUGGLE': 'Nascido trouxa',
        'PURE': 'Puro-sangue'
    }[bloodType]
}

export const firestoreDateToJS = (firestoreDate: { seconds: number, nanosseconds: number }) => {
    return new Date(firestoreDate.seconds * 1000)
}