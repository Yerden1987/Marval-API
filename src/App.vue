<script setup>
import axios from "axios";
// import SearchCharacter from "./components/Search.vue";
import md5 from "md5";
import { onMounted, ref } from "vue";

const publicKey = "34de61d4809ea764e07ac7f1c40e4e3c";
const privateKey = "781e6aa34708a61eb5f37ea5ec44f4edd78c41f8";
const ts = new Date().getTime();
const hash = md5(ts + privateKey + publicKey);
const characterName = ref("");
const outputName = ref("");
const isLoaded = ref(false);
const listOfSuggests = ref([]);
const imageUrl = ref("");
const biogeography = ref("");
const series = ref("");
const comics = ref("");
// const showSuggestList = ref(true);

// const res = axios(`/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=hulk`);

const getCharacherByName = async (name) => {
  const {
    data: { data: res },
  } = await axios(
    `/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&name=${name}`
  );
  const { results: character } = res;
  const [temp] = character;

  imageUrl.value = temp.thumbnail.path + "." + temp.thumbnail.extension;
  outputName.value = temp.name;
  biogeography.value = temp.description;
  comics.value = temp.comics;
  series.value = temp.series;

  // showSuggestList.value = false;
};

const btnSubmit = () => {
  getCharacherByName(characterName.value);
};

const getCharacher = async () => {
  const {
    data: { data: res },
  } = await axios(
    `/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${characterName.value}`
  );

  const { results: characters } = res;
  // console.log(data);

  if (characters.length < 1) {
    isLoaded.value = false;
    // console.log("No such a character");
    return;
  } else {
    isLoaded.value = true;
  }

  listOfSuggests.value = [];
  characters.forEach((character) => {
    listOfSuggests.value.push(character.name);
  });

  // listOfSuggests.value = characters.map((character) => character.name);

  imageUrl.value =
    characters.thumbnail.path + "." + characters.thumbnail.extension;
  console.log(characters);
  outputName.value = characters.name;
};

onMounted(() => {
  getCharacher();
});
</script>

<template>
  <div class="container">
    <div class="input-container">
      <!-- <SearchCharacter @input-search="inputSearch" /> -->
      <form @submit.prevent="getCharacher">
        <input
          type="search"
          id="characterName"
          class="input"
          v-model="characterName"
          @input="getCharacher"
          list="charactersList"
          placeholder="Search character"
        />
        <datalist id="charactersList">
          <option v-for="name in listOfSuggests" :value="name">
            {{ name }}
          </option>
        </datalist>
        <button class="button" @click="btnSubmit">Submit</button>
      </form>
    </div>
    <div class="output" v-if="isLoaded">
      <img :src="imageUrl" alt="thumbnail" />
      <h2>{{ outputName }}</h2>
      <div v-if="biogeography">
        <h3>A short bio or description of the character:</h3>
        <p class="biogeography">
          {{ biogeography }}
        </p>
      </div>
      <div v-else>
        <p class="biogeography">
          A short biography or character description will be added a little
          later.
        </p>
      </div>
      <h3>A resource list containing comics which feature this character:</h3>
      <p class="comics">{{ comics }}</p>
      <h3>A resource list of series in which this character appears:</h3>
      <p class="series">{{ series }}</p>
      <br />
      <br />
      <!-- <ul v-if="showSuggestList"> -->
      <!-- <li v-for="name in listOfSuggests"> -->
      <!-- <p @click="getCharacherByName(name)" style="cursor: pointer"> -->
      <!-- {{ name }} -->
      <!-- </p> -->
      <!-- </li> -->
      <!-- </ul> -->
    </div>

    <div class="output" v-else>
      <h1>No such a character</h1>
    </div>
  </div>
</template>
