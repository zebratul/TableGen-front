import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import Table from "./Table";
import axios from "axios";

function createAxiosInstance() {
    return axios.create({
        baseURL: "https://backend-task5.osc-fr1.scalingo.io",
    });
}

function App() {
    const [seed, setSeed] = useState("Itransition");
    const [locale, setLocale] = useState("en");
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [corruptionLevel, setCorruptionLevel] = useState(0);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      fetchData();
  }, [page]);

  const fetchData = () => {
      setIsLoading(true);
      const instance = createAxiosInstance();
      instance
          .get(`/api/data?locale=${locale}&seed=${seed}&page=${page}&corruptionLevel=${corruptionLevel}`)
          .then((response) => {
              const newData = [...data, ...response.data];
              setData(newData);
              setIsLoading(false);
        })
          .catch((error) => {
              console.error(error);
              setError(error);
              setIsLoading(false);
          });
  };

  const fetchWithNewParams = () => {
      setIsLoading(true);
      const instance = createAxiosInstance();
      instance
          .get(`/api/data?locale=${locale}&seed=${seed}&page=${page}&corruptionLevel=${corruptionLevel}`)
          .then((response) => {
              setData(response.data);
              setIsLoading(false);
        })
          .catch((error) => {
              console.error(error);
              setError(error);
              setIsLoading(false);
        });
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      setData([]);
      setPage(1);
      fetchWithNewParams()
  };
  
  const handleRandomSeed = () => {
      const randomSeed = Math.floor(Math.random() * 1000000).toString();
      setSeed(randomSeed);
  };

  const handleScroll = () => {
      const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight =
          document.documentElement.clientHeight || window.innerHeight;
      const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
      if (scrolledToBottom) {
          setPage(page + 1);
      }
  };

  useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
          window.removeEventListener("scroll", handleScroll);
      };
  }, [page]);

  return (
      <Container className="py-3">
        <Header
          seed={seed}
          setSeed={setSeed}
          locale={locale}
          setLocale={setLocale}
          handleSubmit={handleSubmit}
          handleRandomSeed={handleRandomSeed}
          corruptionLevel={corruptionLevel}
          setCorruptionLevel={setCorruptionLevel}
          fetchData={fetchData}
        />
        <Row>
          <Col>
            <Table data={data} isLoading={isLoading} error={error} />
          </Col>
        </Row>
      </Container>
  );
}

export default App;
