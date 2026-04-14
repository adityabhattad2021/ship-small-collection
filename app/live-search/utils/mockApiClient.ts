import mockData from './mock-data.json';

export interface UserData{
    createdAt: string;
    name:string;
    heroImage:string;
    id:string;
}

const API_DELAY = 1000;




export default async function getUsersByName(name:string): Promise<UserData[] | null>{
    const trimmedName = name.trim();
    if(trimmedName.length === 0){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(mockData);
            },API_DELAY);
        });
    }
    const result = mockData.filter((val)=>{
        const fullName = val.name;
        const [firstName, lastName] = fullName.split(" ");
        return firstName.toLowerCase().startsWith(trimmedName.toLowerCase()) || lastName.toLowerCase().startsWith(trimmedName.toLowerCase());
    })
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(result);
        }, API_DELAY)
    });
}

