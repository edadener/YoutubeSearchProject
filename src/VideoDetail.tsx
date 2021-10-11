import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Embed, Grid, GridColumn, Icon, Segment } from 'semantic-ui-react'
import { Item } from './models/IVideos'

export default function VideoDetail() {
    
    const [videox, setVideox] = useState<Item>()
    const [status, setStatus] = useState(false)
    const [detail, setDetail] = useState<Item>()
    const [favorites, setFavorites] = useState([])

    const aa = localStorage.getItem("videoDetail")
  
   useEffect(() => {
   setDetail(JSON.parse(aa!))

   const fav:any = localStorage.getItem("fav")
   const arr = ( JSON.parse(fav) )
   setFavorites(arr)
  }, [])


    useEffect(() => {
       getVideoDetail()
    }, [])
    
    function getVideoDetail() {
        const videoDetailLocal = localStorage.getItem("videoDetail")
        const parseVideoDetail = JSON.parse(videoDetailLocal!)
        //console.log(parseVideoDetail)
        setVideox(parseVideoDetail)
    }

  function addFav(data: any) {
      setStatus(!status)
    let fav:any = []
    if( status !== true) {

      fav.push(data)

      if(localStorage.getItem("fav") === null){ 

        localStorage.setItem("fav",JSON.stringify(fav))

    }
    else {
        const favorite:any=localStorage.getItem("fav")
        const arr=(JSON.parse(favorite))
        arr.push(data)
        localStorage.setItem("fav", JSON.stringify(arr))
    }
    }
    else{
       const favArr = fav.filter((x: any) => x.id.videoId !== detail?.id.videoId); 
       localStorage.setItem("fav",JSON.stringify(favArr))
    }
}

        
    function toDateString(x: Date) {
      const convertDate = new Date(x)
      return convertDate.toLocaleDateString()
    }

    return (
        <>
    
    <h1>Video Detail</h1>
    <hr />
<Grid doubling columns="2">
          {videox && (
            <Fragment>
              <GridColumn width="12">
                <Embed
                  autoplay={false}
                  id={videox?.id?.videoId}
                  active
                  source="youtube"
                  onClick={(e, data) => console.log(e)}
                  iframe={{
                    allowFullScreen: true,
                   
                  }}
                />
              </GridColumn>
              <GridColumn width="4">

    <Segment vertical>
    {videox.snippet?.title}
    </Segment>

    <Segment vertical>
    {videox.snippet?.description}
    </Segment>

    <Segment vertical>
    {videox.snippet?.channelTitle}
    </Segment>

    <Segment vertical>
   
   { toDateString(videox.snippet?.publishTime ) }

    </Segment>

    <Segment vertical>
    <Button content={ status ? 'remove' : 'Add Fav'}
              icon='heart'
              color={ status ? 'violet' : 'grey'}
              onClick={ (e) => addFav(detail)}
              /> 
    </Segment>

    <Segment vertical>
    <Button animated
            color= "blue"
            as={Link} 
            to="/">
       <Button.Content visible> Back to Search </Button.Content>
       <Button.Content hidden><Icon name="arrow left" /></Button.Content>
    </Button>
    </Segment>
    

              </GridColumn>
            </Fragment>
          )}
        </Grid>
            
        </>
    )
}



