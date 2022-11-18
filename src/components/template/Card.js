import './Card.css';


export default function Cards ({marca,modelo,ano,valor,img}){
    return(      
            
            <div className='card'>
                <div>
                   <img className='imgCarro' src={img}/> 
                </div>
                <div className='nomeCarro'>
                    {marca} {modelo}
                </div>
                <div className='valor'>
                   Valor: {valor}
                </div>
                <div className='ano'>
                    Ano: {ano}
                </div>
                <p></p>
            </div>     
      
    )
}