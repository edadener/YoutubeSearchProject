import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Card, Form, Grid, GridColumn, Input, Image, Segment } from 'semantic-ui-react';
import { Item } from './models/IVideos'
import { getPopular, getResult } from "./Services"

export default function Home() {

    const [result, setResult] = useState<Item[]>([])
    const [search, setSearch] = useState("")
    const [lastSeen, setLastSeen] = useState<Item[]>([])
    const [popular, setPopular] = useState<Item[]>([])
    const [favVideo, setFavVideo] = useState<Item[]>([])

    useEffect(() => {
        lastSeenVideos()
    }, [])

    useEffect(() => {
       getPopularVideos()
    }, [])

    function getPopularVideos() {
        getPopular().then(res => {
            //console.log(res.data.items)
            setPopular(res.data.items)
        })
    }

   
    function lastSeenVideos() {
        const lastSeenVideo = localStorage.getItem("lastSeen") 
        const parseLastSeenVideo: Item[] = JSON.parse(lastSeenVideo!)
        setLastSeen(parseLastSeenVideo)
    }

    function getVideos(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        getResult(search).then( (res) => {
        const arr: Item[] = [];
        // console.log(res.data)
        res.data.items.map((item : Item) => {
            return arr.push(item);
        })
        setResult(arr)
        })
    }

    function videoDetail(data: Item) {
        const videoDetail = JSON.stringify(data)
        localStorage.setItem("videoDetail", videoDetail)
        const lastSeen = localStorage.getItem("lastSeen")
        console.log(lastSeen)
        if(lastSeen === null) {
            const lastArr: Item[] = [];
            lastArr.unshift(data)
            localStorage.setItem("lastSeen", JSON.stringify(lastArr))
        }else{
            const parseLast: Item[] = JSON.parse(lastSeen)
            parseLast.unshift(data)
            if(parseLast.length > 4) {
                parseLast.pop()
            }
            localStorage.setItem("lastSeen", JSON.stringify(parseLast))
        }
    }

    useEffect(() => {
      
    const arrFavorite: any = localStorage.getItem("fav");
    const arrFav = JSON.parse(arrFavorite) || [];
    const favSlice=arrFav.slice(-4)
    setFavVideo(favSlice);

    }, [])




    return (
        <>
            <h1>Youtube Video Search</h1>
            <hr />
            <br />
            <Form onSubmit= { (e) => getVideos(e)}>
                <Input 
                style = {{width: 980, marginLeft: 50}}
                placeholder= "YouTube Video Search.."
                action = {{ type: "submit", icon: "search", color: "blue"}}
                onChange = { (e) => setSearch(e.target.value)} 
                />
            </Form>

     
            <Grid columns={1} style={{marginTop:10, width:1000, marginLeft:35}}>
            {result.length > 0 &&
              result.map((item, index) => {
                return (
                  <GridColumn key={index}>
                    <Card fluid color="blue" as={Link} to={"/videoDetail/" + item.id.videoId} onClick={(e) => videoDetail(item)}>
                      <Card.Content>
                      <Image
                        src={item.snippet?.thumbnails?.default?.url}
                        style = {{ float: "left", marginRight:10}}
                        wrapped
                        ui={false}
                      />
                        <Card.Header>
                          {item.snippet?.title}
                        </Card.Header>
                        <Card.Meta>
                          <span className="date">
                          {item.snippet?.description}
                          </span>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </GridColumn>
                );
              })}
          </Grid>

<br />
          <Segment>
         <h2 >Recently Watched Videos</h2>
          <Grid columns="4">
          {lastSeen.length > 0 &&
            lastSeen.map((item, index) => {
                return (
                  <GridColumn key={index}>
                    <Card fluid color="blue" as={Link} to={"/videoDetail/" + item.id.videoId} onClick={(e) => videoDetail(item)}>
                      <Image
                        src={item.snippet?.thumbnails?.high?.url}
                        width={item.snippet?.thumbnails?.high?.width}
                        wrapped ui={false}
                      />
                      <Card.Content>
                        <Card.Header>
                          {item.snippet?.title}
                        </Card.Header>
                        <Card.Description>
                          {item.snippet?.channelTitle}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </GridColumn>
                );
              })}
          </Grid>
        </Segment>


        <Segment>
         <h2 >Popular Videos</h2>
          <Grid columns="4">
            {popular.length > 0 &&
            popular.map((item, index) => {
                return (
                  <GridColumn key={index}>
                    <Card fluid color="blue" as={Link} to={"/videoDetail/" + item.id.videoId} onClick={(e) => videoDetail(item)}>
                      <Image
                        src={item.snippet?.thumbnails?.high?.url}
                        width={item.snippet?.thumbnails?.high?.width}
                        wrapped ui={false}
                      />
                      <Card.Content>
                        <Card.Header>
                          {item.snippet?.title}
                        </Card.Header>
                        <Card.Description>
                          {item.snippet?.channelTitle}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </GridColumn>
                );
              })}
          </Grid>
        </Segment>

        <Segment>
         <h2 >Favorite Videos</h2>
          <Grid columns="4">
            {favVideo.length > 0 &&
            favVideo.map((item, index) => {
                return (
                  <GridColumn key={index}>
                    <Card fluid color="blue" as={Link} to={"/videoDetail/" + item.id.videoId} onClick={(e) => videoDetail(item)}>
                      <Image
                        src={item.snippet?.thumbnails?.high?.url}
                        width={item.snippet?.thumbnails?.high?.width}
                        wrapped ui={false}
                      />
                      <Card.Content>
                        <Card.Header>
                          {item.snippet?.title}
                        </Card.Header>
                        <Card.Description>
                          {item.snippet?.channelTitle}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </GridColumn>
                );
              })}
          </Grid>
        </Segment>
      

        </>
    )
}
