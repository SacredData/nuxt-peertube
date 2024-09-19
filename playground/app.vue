<template>
  <div>
  <div>
    Nuxt module playground!
  </div>
  <iframe
    :src="srcRef"
    width="1280"
    height="720"
    frameborder="0"
    marginheight="0"
    marginwidth="0"
    allowfullscreen
 />
    <div>
  <button @click="login">
    LOGIN
  </button>
    </div>
    <h1>OAUTH</h1>
    <p>
      {{oauthRef}}
    </p>
    <h1>USER</h1>
    <p>{{userRef}}</p>
    <h1>NOTIFICATIONS</h1>
    <p>{{notifRef}}</p>
    <h1>HISTORY</h1>
    <p>{{historyRef}}</p>
  </div>
</template>

<script setup>
  //import {PeerTubePlayer} from '@peertube/embed-api'
  const { $locally } = useNuxtApp()
  const srcRef = ref('')
  const infoRef = ref('')
  const oauthRef = ref('')
  const historyRef = ref('')
  const userRef = ref('')
  const notifRef = ref('')

  async function login() {
    // Login!
    const oauthStuff = await usePeertubeClient('producer', 'producer#1')
    $locally.setItem('access_token', oauthStuff.access_token)
    console.log($locally.getItem('access_token'), ' set access token in local storage ')

    oauthRef.value = JSON.stringify(oauthStuff)
    // Get user history of logged in user!
    const history = await usePeertubeUserHistory(oauthStuff)
    console.log(history, 'HISTORY')
    historyRef.value = JSON.stringify(history)

    const myUser = await usePeertubeUserSettings(oauthStuff)
    console.log(myUser, 'MYUSER')
    userRef.value = JSON.stringify(myUser)

    const myNotifs = await myUser.getNotifications()
    console.log(myNotifs, 'MYNOTIFICATIONS')
    notifRef.value = JSON.stringify(myNotifs)
  }
  try {
    // Login!
    /*const oauthStuff = await usePeertubeClient('producer', 'producer#1')
    $locally.setItem('access_token', oauthStuff.access_token)
    console.log($locally.getItem('access_token'), ' set access token in local storage ')

    // Get user history of logged in user!
    const history = await usePeertubeUserHistory(oauthStuff)
    console.log(history, 'HISTORY')

    const myUser = await usePeertubeUserSettings(oauthStuff)
    console.log(myUser, 'MYUSER')

    const myNotifs = await myUser.getNotifications()
    console.log(myNotifs, 'MYNOTIFICATIONS')
    */
    // Get a peertube channel!
    //const channel = await usePeertubeChannel('part.of.the.problem', oauthStuff.access_token)
    const channel = await usePeertubeChannel('part.of.the.problem')
    console.log(channel)

    // Get a peertube channel's videos!
    const videosFromChannel = channel.recentVideos(20)
    const videoFromChannel = videosFromChannel[1]

    const videoPodcast = await usePeertubeVideoPodcast(3)
    const podcastText = await videoPodcast.text()
    console.log(videoPodcast, podcastText, 'VIDPODCAST')

    /*const userNotifications = await usePeertubeNotifications(oauthStuff, 20)
    console.log(userNotifications, 'notifications for user')
    */
    // Perform a search on a peertube!
    const searchTerm = 'war'
    const searchResults = await usePeertubeSearch(searchTerm, 20)
    console.log(searchResults)

    // Get a video!
    const vid = await usePeertubeVideo(videoFromChannel.id)
    console.log(vid)
    srcRef.value = `https://gas.tube.sh${vid.embedPath}?api=1&subtitle=en&autoplay=1&warningTitle=0&p2p=1&peertubeLink=0`

    /*const playlist = await usePeertubePlaylist(20, oauthStuff.access_token)
    console.log(playlist)*/

    onMounted(async () => {
      //const player = new PeerTubePlayer(document.querySelector('iframe'))
      //await vid.mountPlayer(player)
      //console.log('mounted player onto video', vid)
    })

  } catch (err) {
    console.error(err)
  }


</script>
