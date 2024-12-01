import { Link } from "react-router-dom";
import {
  Wrapper,
  Grid,
  Card,
  CardImage,
  CardHover,
  CardText,
  TopMenu,
  Searchbar,
} from "./Style.jsx";
import { useEffect, useState } from "react";
import { getSocieties, getSocietiesOnSearch } from "./Funtions.jsx";

async function getSocieties(setSocieties) {
  const res = await axios.get(process.env.REACT_APP_API + "/societies", {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  // Sort Data and Store in Courses
  setSocieties(res.data);
  return;
}

const Societies = () => {
  const [societies, setSocieties] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const PullData = async () => {
      try {
        return await getSocieties(setSocieties);
      } catch (err) {
        console.log(err);
      }
    };
    PullData();
  }, []);

  useEffect(() => {
    const PullData = async () => {
      try {
        if (search === "") {
          return await getSocieties(setSocieties);
        }
        await getSocietiesOnSearch(search, setSocieties);
      } catch (err) {
        console.log(err);
      }
    };
    PullData();
  }, [search]);

  return (
    <Wrapper>
      <TopMenu>
        <Searchbar>
          <input
            class="search__input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Quick Search"
          />
        </Searchbar>
      </TopMenu>
      <Grid
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        {societies.map((society) => {
          return (
            <Link
              to={{
                pathname: `/society/${society._id}`,
                society: society,
              }}
            >
              <Card
                key={society._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <CardImage>
                  <img src={society.picture} alt={society.code} />
                </CardImage>
                <CardHover className="body">
                  <h2>{society.code}</h2>
                  {/* Link to society/:societyId and also pass the current society object, and society id*/}

                  <button className="btn">View Society</button>

                  <h4> </h4>
                </CardHover>
                <CardText>
                  <span className="quality"></span>
                  <div className="bottom">
                    <div className="societyname">
                      {/* <span>{society.code}</span> */}
                      <strong>{society.name}</strong>
                    </div>
                  </div>
                </CardText>
              </Card>
            </Link>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

export default Societies;
