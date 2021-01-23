import { useEffect, useState, useCallback } from 'react';

import api from '../services/api';

import {
  Container,
  Content,
  InputContainer,
  GraphicContainer,
  Graphic
} from '../styles/home';

export default function Home() {
  const [mapData, setMapData] = useState(null);

  const [airports, setAirports] = useState(0);
  const [clouds, setClouds] = useState(0);
  const [mapColumns, setMapColumns] = useState(0);
  const [mapRows, setMapRows] = useState(0);

  const submitMapData = useCallback((e) => {
    e.preventDefault();
  
    async function getMapData() {
      const response = await api.get('/', {
        params: {
          airports: airports,
          clouds: clouds,
          mapColumns: mapColumns,
          mapRows: mapRows
        },
      });

      setMapData(response.data)
    }

    getMapData();
  }, [airports, clouds, mapColumns, mapRows])

  return (
    <Container>
      <Content>
        <h1>Zona de aeroportos</h1>

        <form onSubmit={submitMapData}>
          <InputContainer>
            <span>
              <strong>Aeroportos</strong>
              <small>(Pelo menos 3)</small>
              <input
                value={airports}
                onChange={(e) => setAirports(e.target.value)}
                type="number"
                min="3"
              />
            </span>

            <span>
              <strong>Nuvens</strong>
              <small>(Pelo menos 4)</small>
              <input
                value={clouds}
                onChange={(e) => setClouds(e.target.value)}
                type="number"
                min="4"
              />
            </span>
          </InputContainer>

          <InputContainer>
            <span>
              <strong>Linhas</strong>
              <small>(Pelo menos 10)</small>
              <input
                value={mapRows}
                onChange={(e) => setMapRows(e.target.value)}
                type="number"
                min="10"
                />
            </span>

            <span>
              <strong>Colunas</strong>
              <small>(Pelo menos 10)</small>
              <input
                value={mapColumns}
                onChange={(e) => setMapColumns(e.target.value)}
                type="number"
                min="10"
              />
            </span>
          </InputContainer>

          <button type="submit">Enviar</button>
        </form>


        {mapData ? (
          <GraphicContainer>
            Cobrirá o primeiro aeroporto em {mapData.coverFirstAirport} dia(s)
            <br/>
            Cobrirá todos os aeroportos em {mapData.coverLastAirport} dia(s)
            <br/>

            <h2>Dia 1</h2>
            <Graphic
              columns={mapData.mapDimensionX}
              rows={mapData.mapDimensionY}
            >
              {mapData.map.map((data, index) => (
                <span key={index}>{data}</span>
                ))}
            </Graphic>

            <h2>Dia {mapData.coverFirstAirport}</h2>
            <Graphic
              columns={mapData.mapDimensionX}
              rows={mapData.mapDimensionY}
              >
              {mapData.mapFirstDay.map((data, index) => (
                <span key={index}>{data}</span>
                ))}
            </Graphic>

            <h2>Dia {mapData.coverLastAirport}</h2>
            <Graphic
              columns={mapData.mapDimensionX}
              rows={mapData.mapDimensionY}
              >
              {mapData.mapLastDay.map((data, index) => (
                <span key={index}>{data}</span>
              ))}
            </Graphic>
          </GraphicContainer>
        ) : null}
      </Content>
    </Container>
  )
}
