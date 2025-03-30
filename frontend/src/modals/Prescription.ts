export type Prescription = {
    visit: string;
    medication_name: string;
    dosage: string;
    quantity: number;
    refills: number;
    start_date: string;
    end_date: string;
    instructions: string;
}

export type prescriptionDataType = {
    id: number,
    visit: number,
    medication_name: string,
    dosage: string,
    quantity: number,
    start_date: string,
    end_date: string,
    instructions: string
}