

export default function authBasic(): boolean {
 
    
    const user = JSON.parse(localStorage.getItem('user') || '');
  
    if (user && user.token) {
      return true
    } else {
        return false
      
    }
  }