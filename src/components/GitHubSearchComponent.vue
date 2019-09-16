<style scoped lang="scss">
label {
  font-weight: bold;
}

input {
  margin-bottom: 2rem;
  &[type="date"]:hover {
    cursor: pointer;
  }
}

.w3-input {
  display: initial;
}

.validation-error {
  color: $color-error;
  font-weight: bold;
  position: relative;
  float: right;
}

.hidden {
  display: none;
}

.fas,
.far {
  margin-left: 2rem;
}

.stars {
  label {
    display: block;
  }
  &-slider {
    display: inline-block;
    margin: 0 0 0.4rem 0.6rem;
    position: relative;
    top: 1.6rem;
    max-width: 160px; // for IE11
  }
  span {
    position: relative;
    top: 0.5rem;
    left: 2rem;
    bottom: 1rem;
  }
  .fa-star {
    color: gold;
    text-shadow: 1px 0px black, -1px 0px black, 0px 1px black, 0px -1px black;
  }
}

.clickable {
  cursor: pointer;
}

#search-github {
  display: inline-block;
  width: 80%;
  padding: 0.4rem;
  text-align: center;
  margin-left: 3rem;
  background-color: $color-secondary-2-2;
  color: white;
  &:hover {
    cursor: pointer;
    background-color: $color-secondary-2-0;
  }
}

.width {
  &-100 {
    width: 100%;
  }
  &-75 {
    display: inline-block;
    width: 75%;
  }
  &-50 {
    display: inline-block;
    width: 50%;
    &-gutter-right {
      display: inline-block;
      width: calc(50% - 0.5rem);
      margin-right: 0.5rem;
    }
    &-gutter-left {
      display: inline-block;
      width: calc(50% - 0.5rem);
      margin-left: 0.5rem;
    }
  }
  &-25 {
    display: inline-block;
    width: 25%;
  }
}

.loading {
  width: 100%;
  border: 1px solid grey;
  height: 10px;
  &-bar {
    background-color: $color-secondary-1-1;
    -webkit-animation: fill 3s linear;
    -webkit-animation-iteration-count: infinite;
    animation: fill 3s linear;
    animation-iteration-count: infinite;
    height: 8px;
    width: 10%;
  }
}

@-webkit-keyframes fill {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

@keyframes fill {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .width {
    &-100 {
      display: block;
      width: 100%;
      margin: 1rem auto;
    }
    &-75 {
      display: block;
      width: 100%;
      margin: 1rem auto;
    }
    &-50 {
      display: block;
      width: 100%;
      margin: 1rem auto;
      &-gutter-right {
        display: block;
        width: 100%;
        margin: 1rem auto;
      }
      &-gutter-left {
        display: block;
        width: 100%;
        margin: 1rem auto;
      }
    }
    &-25 {
      display: block;
      width: 100%;
      margin: 1rem auto;
    }
  }
  .language-container,
  .license-container {
    display: block;
    width: 100%;
    margin: 1rem auto;
  }
  .search-button-container {
    text-align: center;
    margin-top: 2rem;
    #search-github {
      width: 30%;
    }
  }
}

@media (max-width: 400px) {
  .search-button-container {
    #search-github {
      width: 50%;
    }
  }
}
</style>
<style lang="scss">
#search_language,
#search_license {
  padding: 8px;
  display: inline-block;
  border: none;
  border-bottom-color: currentcolor;
  border-bottom-style: none;
  border-bottom-width: medium;
  border-bottom: 1px solid #ccc;
  appearance: none;
  &:hover {
    cursor: pointer;
  }
}

.license-container,
.language-container {
  box-sizing: border-box;
  margin-bottom: 2rem;
  label {
    display: block;
  }
}

.language-container {
  display: inline-block;
}

.license-container {
  select {
    max-width: 100%; // IE11 fix
  }
}

@media (max-width: 600px) {
  .language-container,
  .license-container,
  #search_language,
  #search_license {
    display: block;
    width: 100%;
    margin: 0 auto;
  }
}
</style>

<template>
  <form id="github-search-form" class="w3-container" v-on:keyup.enter="search(true)">
    <div class="width-100">
      <label>
        Search
        <i class="fas fa-search"></i>
        <span
          id="form-error"
          class="validation-error hidden"
        >You haven't selected anything to search on</span>
      </label>
      <input
        id="searchterm"
        class="w3-input"
        data-search-suffix="in:name,description"
        type="text"
        placeholder="I'm looking for..."
      />
    </div>
    <div class="width-100">
      <div class="width-50-gutter-right">
        <label>
          Last update after
          <i class="far fa-calendar-alt"></i>
        </label>
        <input class="w3-input" data-search-prefix="pushed:" type="date" placeholder="dd-mm-yyyy" />
      </div>
      <div class="width-50-gutter-left">
        <label>
          Creator / Owner
          <i class="fas fa-user-tag"></i>
        </label>
        <input class="w3-input" data-search-prefix="user:" type="text" placeholder="Created by.." />
      </div>
      <div class="width-100">
        <div class="width-50-gutter-right language-container">
          <label>
            Programming language
            <i class="fas fa-laptop-code"></i>
          </label>
          <ProgrammingLanguage />
        </div>
        <div class="width-50-gutter-left stars">
          <label>
            Minimum amount of stars
            <i class="fas fa-star"></i>
          </label>
          <input
            v-model="stars"
            data-search-prefix="stars:>="
            type="range"
            min="0"
            max="1000000"
            class="stars-slider"
          />
          <span v-if="stars > 0">&gt;=</span>
          <span class="clickable" v-on:click="manualEnter">{{ readableStarsAmount }}</span>
        </div>
        <div class="width-100 license-container">
          <label>
            License
            <i class="far fa-address-card"></i>
          </label>
          <div class="width-75">
            <LicenseSelect />
          </div>
          <div class="width-25 search-button-container">
            <div id="search-github" v-on:click="search(true)">
              <span>
                Let's go!
                <i class="far fa-paper-plane"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="progress">
      <span>Asking the API nicely for results.</span>
      <div class="loading">
        <div class="loading-bar"></div>
      </div>
    </div>
  </form>
</template>

<script>
import ProgrammingLanguage from "@/components/GitHubProgrammingLanguageSelect.vue";
import LicenseSelect from "@/components/GitHubLicenseSelect.vue";

export default {
  name: "GitHubSearchComponent",
  components: {
    ProgrammingLanguage,
    LicenseSelect
  },
  props: ["page"],
  data: function() {
    return {
      stars: 0,
      progress: false,
      showing: 100,
      query: "",
      selectedPage: 1
    };
  },
  created: function() {
    if (this.page != null && this.page != undefined)
      this.selectedPage = this.page;
  },
  methods: {
    search: function(newQuery) {
      if (newQuery) this.selectedPage = 1;

      this.query = buildQuery();

      if (this.progress || !validateQuery(this.query)) return;

      this.progress = !this.progress;
      const url = "https://api.github.com/search/repositories";
      const request = `${url}?q=${this.query}&per_page=${this.showing}&page=${this.selectedPage}`;

      const vueComponent = this;

      let xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          vueComponent.$emit("results", {
            newRequest: newQuery,
            maxPages: xhttp.getResponseHeader("link"),
            data: JSON.parse(xhttp.responseText)
          });
          vueComponent.progress = !vueComponent.progress;
        }

        if (this.status == 404 || this.status == 403) {
          alert(`Error: ${this.status}`);
          vueComponent.progress = !vueComponent.progress;
        }
      };

      xhttp.open("GET", request, true);
      xhttp.send();
    },
    manualEnter: function() {
      let userResult = prompt("Please enter the amount of stars", this.stars);

      userResult = userResult.toString().replace("k", "000");

      if (userResult != undefined && Number(userResult))
        this.stars = userResult;
    }
  },
  computed: {
    readableStarsAmount: function() {
      let stringify = this.stars.toString();
      if (this.stars < 1) return stringify;

      if (this.stars > 999 && this.stars < 9999) {
        return `${stringify.substring(0, 1)}.${stringify.substring(1, 4)}`;
      } else if (this.stars > 9999 && this.stars < 99999) {
        return `${stringify.substring(0, 2)}.${stringify.substring(2, 5)}`;
      } else if (this.stars > 99999 && this.stars < 999999) {
        return `${stringify.substring(0, 3)}.${stringify.substring(3, 6)}`;
      } else if (this.stars > 999999 && this.stars < 9999999) {
        return `${stringify.substring(0, 1)}.${stringify.substring(
          1,
          4
        )}.${stringify.substring(4, 7)}`;
      } else {
        return stringify;
      }
    }
  },
  watch: {
    page: function(newPage) {
      this.selectedPage = newPage;
      this.search();
    }
  }
};

function validateQuery(query) {
  const errorEl = document.getElementById("form-error");
  if (query !== undefined && query.toString().trim().length === 0) {
    errorEl.classList.remove("hidden");
    return false;
  } else {
    errorEl.classList.add("hidden");
    return true;
  }
}

function buildQuery() {
  const query = [];
  const form = document.getElementById("github-search-form");
  const inputs = form.getElementsByTagName("input");
  const selects = form.getElementsByTagName("select");

  for (const input of inputs) {
    if (
      input.value != undefined &&
      input.value != 0 &&
      input.value.toString().trim().length > 0
    ) {
      let queryResult = "";

      switch (input.id) {
        case "searchterm": {
          queryResult = `${input.value}+${input.dataset.searchSuffix}`;
          break;
        }
        default: {
          queryResult = `${input.dataset.searchPrefix}${input.value}`;
        }
      }
      query.push(queryResult);
    }
  }
  for (const select of selects) {
    if (
      select.value != undefined &&
      select.value.toString().trim().length > 0
    ) {
      const queryResult = `${select.dataset.searchPrefix}${select.value}`;
      query.push(encodeURIComponent(queryResult));
    }
  }

  return query.join("+");
}
</script>