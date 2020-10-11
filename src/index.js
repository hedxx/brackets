module.exports = function check(str, arr) {
  var hesh = {};
  var temp = {};
  var strArr = [];

  for ( let i = 0; i < arr.length; i ++ ){

   for ( let j = 0; j < 2; j ++ ){

        var temp = {};

        temp.index = i;
    if( !(arr[i][j] in hesh) ) {
        if ( j === 0 ) {
           temp.status = 'open';     
        } else if ( j === 1 ){
           temp.status = 'close';               
        }     
        hesh[arr[i][j]] = temp; 
     } else if( arr[i][j] in hesh ) {
        
        hesh[arr[i][j]].status = 'bilateral';  
      } 
    }    
  }

 strArr = str.split('');
   
 function funBilatery(ar) {

    let ind;
    let count = 0;
    let j = 0;
    let i = 0;
    do
    {
           //console.log(ar);console.log(i);

           ind = hesh[ar[i]].index;
           j = i;
           count = 0;

           while ( j < ar.length && hesh[ar[j]].index === ind ){

               j ++ ;
               count ++ ;

           }
         if( !(count%2) ) 
           {
              
               ar.splice( i,count );
               i = j - count - 1;
               if ( i < 0 ) { i = 0;} 
               continue;              

          } else if ( count%2 && count > 1 )
             {
                                             
               ar.splice( i,count - 1 );
               i = j - count;   
               continue;          
            }         
        i ++;
    } while ( i < ar.length )

        if ( ar.length )  {  console.log('FALSEBI'); return false;  }
          else { console.log('TRUEBI'); return true; }
 }


 for ( let i = 0; i < strArr.length; i ++ ){

  if ( hesh[strArr[i]].status === 'close' ) {
    
      if ( (i !== 0) && (hesh[strArr[i-1]].status === 'open') && (hesh[strArr[i]].index === hesh[strArr[i-1]].index) ) {
       strArr.splice( i-1,2 );
         i = i - 2;

     } else if ( (i !== 0) && (hesh[strArr[i-1]].status === 'bilateral')) {

          let j = i - 1;
          let count  = 0;

          while( hesh[strArr[j]].status === 'bilateral'){

             count ++;
             j --;
          }
      
         if ( !(count %2) && (j !== 0) && (hesh[strArr[j]].status === 'open') && (hesh[strArr[j]].index === hesh[strArr[i]].index) ) {

            strArr.splice( j, ( i - j + 1 ) );
            i = j - 1;           

         }   
        
        else{  console.log("FALSE1");  return false; }
       }  
      else { console.log("FALSE2");  return false; }
  } 

}

//console.log(strArr.length);

  if( strArr.length && strArr.length%2  ) 
  {
    console.log("FALSE3");
    return false;

 } else if ( strArr.length && !(strArr.length%2) ) 
   {  

        for(let i = 0 ; i < strArr.length; i ++){
          if (hesh[strArr[i]].status != 'bilateral') 
           {
                console.log("FALSE4");
                return false;
            }
        }
      return funBilatery(strArr);
   }
if ( !strArr.length ) { console.log("TRUE"); return true; }
}
