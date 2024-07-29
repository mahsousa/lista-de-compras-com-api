import React from 'react'
import * as C from './style'

const DashItem = ({title, Icon, value, textoRed, iconColor}) => {
  console.log(textoRed , title)
  return (
    <C.Container>
      <C.Header>
        <C.HeaderTitle>{title}</C.HeaderTitle>
        <Icon style={{
            color:iconColor === '' ? "black" : iconColor
          }}/>
      </C.Header>
      { textoRed ? (
          <C.TotalRed>R$ {value}</C.TotalRed>
        ) : (
          <C.Total> R$ {value}</C.Total>
        )}

    </C.Container>

  )
}

export default DashItem;