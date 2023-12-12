const ShortURLToIntegerId = (shortURL: string) => {
    let id = 0; 
  
    //Conversion to base 64. 
    for (let i = 0; i < shortURL.length; i++) { 
        if ('a' <= shortURL[i] && shortURL[i] <= 'z') 
            id = id * 64 + shortURL[i].charCodeAt(0) - 'a'.charCodeAt(0); 
        if ('A' <= shortURL[i] && shortURL[i] <= 'Z') 
            id = id * 64 + shortURL[i].charCodeAt(0) - 'A'.charCodeAt(0) + 26; 
        if ('0' <= shortURL[i] && shortURL[i] <= '9') 
            id = id * 64 + shortURL[i].charCodeAt(0) - '0'.charCodeAt(0) + 52;
        if ( shortURL[i] === '.')
            id = id * 64 + 62;
        if ( shortURL[i] === '/')
            id = id * 64 + 63; 
    } 
    return id;

}

export default ShortURLToIntegerId;