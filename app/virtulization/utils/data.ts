const NAMES = ["Arjun", "Priya", "Karthik", "Meera", "Rahul", "Ananya", "Dev", "Sneha", "Vikram", "Zara", "Rohan", "Isha", "Aditya", "Nisha", "Kabir"];
const ROLES = ["Frontend", "Backend", "Fullstack", "DevOps", "Design", "PM", "QA", "Data", "ML", "Security"];


export default function getData(count: number) {
    return Array.from({length: count}, (_,index)=>{
        const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
        const randomRole = ROLES[Math.floor(Math.random() * ROLES.length)];
        return {
            id: index,
            name: randomName,
            role: randomRole
        }
    })
}

