export interface UserData {
    id: number;
    name: string;
    pfp: string;
}

const userNames = [
  "Olivia Anderson", "Emma Thompson", "Ava Mitchell", "Sophia Rivera", "Isabella Chen",
  "Priya Sharma", "Mia Johnson", "Charlotte Hayes", "Amelia Foster", "Ananya Patel",
  "Harper Collins", "Evelyn Brooks", "Abigail Turner", "Kavya Krishnamurthy", "Emily Watson",
  "Ella Martinez", "Deepika Nair", "Elizabeth Grant", "Camila Ortega", "Luna Park",
  "Meera Iyer", "Sofia Ramirez", "Avery Dawson", "Mila Novak", "Aria Bennett",
  "Pooja Reddy", "Scarlett O'Brien", "Penelope Cruz", "Layla Hassan", "Ishita Gupta",
  "Victoria Lane", "Madison Clark", "Riya Deshmukh", "Eleanor Price", "Grace Kim",
  "Nora Sullivan", "Shreya Joshi", "Riley Morgan", "Zoey Campbell", "Hannah Fischer",
  "Divya Menon", "Hazel Quinn", "Lily Nguyen", "Neha Kapoor", "Violet Reed",
  "Lillian Stewart", "Zoe Parker", "Anushka Singh", "Stella Romano", "Aurora Blake",
  "Natalie Dunn", "Tanvi Bhatt", "Leah Robinson", "Aubrey Marshall", "Willow Chang",
  "Aditi Rao", "Lucy Hartwell", "Audrey Lambert", "Sanya Malhotra", "Brooklyn Reeves",
  "Paisley Warren", "Savannah Cole", "Nandini Pillai", "Claire Donovan", "Skylar West",
  "Isha Banerjee", "Naomi Taylor", "Elena Vargas", "Rhea Chakraborty", "Caroline Hughes",
  "Anna Petrov", "Maya Johal", "Swati Kulkarni", "Ruby Fitzgerald", "Ivy Chen",
  "Ariana Scott", "Trisha Subramaniam", "Cora Bellingham", "Alice Crawford", "Saanvi Agarwal",
  "Gabriella Moreno", "Samantha Reid", "Pallavi Srinivasan", "Sarah Mitchell", "Autumn Hayes",
  "Kavitha Venkatesh", "Eva Lindgren", "Piper Gallagher", "Juhi Tiwari", "Josephine Beaumont",
  "Adeline Cross", "Fatima Shaikh", "Lydia Barnes", "Clara Jennings", "Anika Dutta",
  "Vivian Chambers", "Madeline Archer", "Radhika Hegde", "Julia Sanderson", "Simran Kaur"
];

const userImages = [
    "https://images.pexels.com/photos/8297124/pexels-photo-8297124.jpeg",
    "https://images.pexels.com/photos/3765150/pexels-photo-3765150.jpeg",
    "https://images.pexels.com/photos/31615337/pexels-photo-31615337.jpeg"
]

const MAX_ELEMENTS = 100;
// in ms
const DELAY = 100;

export async function fakeFetch(pageNumber: number, pageSize: number = 20): Promise<UserData[]>{
    const startIndex = pageNumber * pageSize;
    const remaining = MAX_ELEMENTS - startIndex;
    const toSend = Math.min(pageSize, Math.max(0, remaining));
    const result:UserData[] = [];
    Array.from({length: toSend}, (_, index)=>{
        const randomName = userNames[Math.floor(Math.random() * userNames.length)];
        const randomImage = userImages[(startIndex + index) %  userImages.length];
        result.push({
            id: startIndex + index,
            name: randomName,
            pfp: randomImage
        })
    })
    return new Promise((resolve)=>setTimeout(()=>resolve(result), DELAY));
}