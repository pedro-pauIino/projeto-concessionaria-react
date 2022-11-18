import './Card.css';


export default function Cards ({codLoja,placa,marca,modelo,ano,cor,km,preco,img}){
    return(      
            
            <div className='card'>
                <div className='containerImg'>
                    <img className='imgCarro' src={img}/> 
                    <label className='kmtragem'>{km}</label>
                </div>
                <div className='containerConteudo'>
                    <div className='marca'>{marca}</div>
                    <div className='modelo-ano'>{modelo} - {ano}</div>
                    <div className='cor-placa'>{cor}{placa}</div>
                    <div className='loja-preco'>{codLoja}{preco}</div>
                </div>
            </div>     
      
    )
}