<style lang="scss">
#octocat-search-logo {
  margin: 0.5rem 0 0.5rem auto;
  width: 60px;
  height: 60px;
  border: 2px solid  $color-primary-1;
  border-radius: 1000px;
  background-color: white;
  padding: 0.5rem 0;
}

.search {
  max-width: 600px;
  margin: 4rem auto 2rem auto;
  background-color: white;

  &-options {
    padding: 1rem 0.5rem;
  }

  .title {
    background-color: $color-primary-0;
    color: white;
    display: flex;
    flex-direction: row;
    padding-right: 0.5rem;
  }
}

#search-nav-panel {
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  padding: 1rem;
  flex-direction: row;
  text-align: center;

  span:not(.current-page-count) {
    position: relative;
    top: 9px;
    flex-grow: 3;
  }

  .clickable {
    &:hover {
      cursor: pointer;
    }
  }

  .fas {
    font-size: 4rem;
    color: $color-secondary-2-2;

    &:hover {
      cursor: pointer;
      color: $color-secondary-2-0;
    }
  }
  .fas:last-child {
    margin-left: auto;
  }

  .fas.disabled {
    color: darkgrey;

    &:hover {
      cursor: initial;
    }
  }
}

#search-results {
  margin: 2rem auto 10rem auto;
  width: 96%;
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  flex-wrap: wrap;
}

.search-result {
  position: relative;
  width: 20%;
  background-color: white;
  margin: 1rem;
  overflow-wrap: break-word;
  flex-grow: 1;

  &-title {
    display: flex;
    flex-direction: row;
    height: 30px;
    margin: 1rem 0.5rem;
    padding: 4px;
    font-weight: bold;
    word-wrap: anywhere;
    span::first-letter {
      text-transform: uppercase;
    }

    &-createdtag {
      font-weight: normal;
    }
  }

  &-attributes {
    color: white;
    background-color: $color-secondary-1-2;
    font-size: 1.2rem;
    padding: 6px;
    display: flex;
    flex-direction: row;

    span:last-child {
      margin-left: auto;
    }
  }

  &-content {
    padding: 2rem 1rem 4rem 1rem;

    .far,
    .fas {
      margin-right: 1rem;
    }

    &-description {
      margin-top: 1rem;
    }

    &-link {
      display: flex;
      flex-direction: row;
      justify-content: right;
      position: absolute;
      bottom: 1rem;
      right: 1rem;

      a {
        color: $color-secondary-2-2;

        &:hover {
          color: $color-secondary-2-0;
        }
      }
    }
  }
}

#toTop {
  display: none;
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 99;
  border: none;
  outline: none;
  background-color: $color-secondary-2-2;
  color: white;
  cursor: pointer;
  padding: 1rem 2.5rem;
  border-radius: 4px;
  font-size: 3rem;
}

#toTop:hover {
  background-color: $color-secondary-2-0;
}

@media (max-width: 600px) {
  .title > h2 {
    font-size: 2.2rem;
  }
  .search {
    margin: 0 0 2rem 0;
  }

  #search-nav-panel {
    width: 96%;
    font-size: 1.2rem;
    span:not(.current-page-count) {
      top: 12px;
    }
  }

  #search-results {
    margin-top: 1rem;
    flex-direction: column;
    justify-content: center;
  }

  .search-result {
    width: 100%;
    margin: 0.5rem auto;
  }
}
</style>
<template>
  <div>
    <div class="search">
      <div class="w3-card">
        <div class="w3-container title">
          <h2>GitHub Repository Search</h2>
          <img
            id="octocat-search-logo"
            alt="Octocat with magnifying glass"
            src="@/assets/OctocatSearch.png"
          />
        </div>
        <div id="search-options-panel" class="search-options">
          <GitHubSearchComponent v-on:results="setSearchResults" v-bind:page="page" />
        </div>
      </div>
    </div>
    <div id="search-nav-panel" v-if="totalCount> 0" class="w3-card">
      <i
        v-on:click="paginate('prev')"
        v-bind:class="{ disabled: !prevPage }"
        class="fas fa-caret-left"
      ></i>
      <span>
        Page
        <span
          class="current-page-count"
          v-bind:class="{clickable: totalPages > 1}"
          v-on:click="manualPage"
        >{{this.page}}</span>
        of {{this.totalPages}} page(s) for {{this.totalCount}} results
      </span>
      <i
        v-on:click="paginate('next')"
        v-bind:class="{ disabled: !nextPage }"
        class="fas fa-caret-right"
      ></i>
    </div>
    <div id="search-results">
      <div class="w3-card search-result" v-bind:key="result.id" v-for="result in searchResults">
        <div class="search-result-attributes">
          <span>
            <i class="fas fa-cloud-upload-alt"></i>
            {{toDate(result.pushed_at)}}
          </span>
          <span>
            <i class="far fa-star"></i>
            {{result.stargazers_count}}
          </span>
        </div>
        <div class="search-result-title">
          <span>{{result.full_name}}</span>
        </div>
        <div class="search-result-content">
          <div class="search-result-content-property">
            <i class="fas fa-user-tag"></i>
            {{getValueOrQuestionmark(result.owner.login)}}
          </div>
          <div class="search-result-content-property">
            <i class="fas fa-laptop-code"></i>
            {{getValueOrQuestionmark(result.language)}}
          </div>
          <div class="search-result-content-property">
            <i class="far fa-address-card"></i>
            {{getValueOrQuestionmark(result.license.name)}}
          </div>
          <div class="search-result-content-property">
            <i>
              Created on
              {{toDate(result.created_at)}}
            </i>
          </div>
          <div class="search-result-content-description">{{result.description}}</div>
        </div>
        <div class="search-result-content-link">
          <a v-bind:href="result.html_url" target="_blank">Repository</a>
        </div>
      </div>
    </div>
    <button v-on:click="toTop" id="toTop" class="w3-card-3" title="Back to top">
      <i class="fas fa-long-arrow-alt-up"></i>
    </button>
  </div>
</template>

<script>
import GitHubSearchComponent from "@/components/GitHubSearchComponent.vue";

export default {
  name: "search",
  components: {
    GitHubSearchComponent
  },
  data: function() {
    return {
      totalCount: 0,
      showing: 100,
      searchResults: [],
      totalPages: 0,
      page: 1,
      prevPage: false,
      nextPage: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      let toTopEl = document.getElementById("toTop");
      window.onscroll = function() {
        if (
          document.body.scrollTop > 400 ||
          document.documentElement.scrollTop > 400
        ) {
          toTopEl.style.display = "block";
        } else {
          toTopEl.style.display = "none";
        }
      };
    });
  },
  methods: {
    setSearchResults: function(result) {
      this.totalCount = result.data.total_count;

      if (result.newRequest) {
        const maxPagesRegex = new RegExp(/(\d*)>; rel="last"/gm);
        const lastPage = maxPagesRegex.exec(result.maxPages);
        this.page = 1;

        if (lastPage != null) this.totalPages = lastPage[1];
        else this.totalPages = 1;
      }

      if (this.totalPages == 1) {
        this.nextPage = false;
        this.prevPage = false;
      } else if (this.page != this.totalPages) this.nextPage = true;

      this.searchResults = result.data.items.map(item => {
        return {
          id: getOrDefault(item.id),
          full_name: getOrDefault(item.full_name),
          stargazers_count: getOrDefault(item.stargazers_count),
          html_url: getOrDefault(item.html_url),
          description: getOrDefault(item.description),
          owner: getOrDefault(item.owner),
          created_at: getOrDefault(item.created_at),
          pushed_at: getOrDefault(item.pushed_at),
          license: getOrDefault(item.license),
          language: getOrDefault(item.language)
        };
      });
    },
    toDate: function(rawDate) {
      const date = new Date(rawDate);

      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    },
    getValueOrQuestionmark: function(value) {
      if (value == null || value == undefined || value == "") return "?";
      else return value;
    },
    toTop: function() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    paginate: function(action) {
      switch (action) {
        case "next": {
          if (this.nextPage) {
            this.page++;

            if (this.page == this.totalPages) this.nextPage = false;
            else this.nextPage = true;

            this.prevPage = true;
          }
          break;
        }
        case "prev": {
          if (this.prevPage) {
            this.page--;
            if (this.page == 1) this.prevPage = false;
            else this.prevPage = true;

            this.nextPage = true;
          }
          break;
        }
      }
    },
    manualPage: function() {
      if (this.totalPages <= 1) return;
      const userResult = Number(
        prompt("Enter a page", `1 - ${this.totalPages}`)
      );

      if (Number(userResult)) {
        const pageNumber = parseInt(userResult);
        if (pageNumber > 0 && pageNumber <= this.totalPages)
          this.page = pageNumber;
      }
    }
  }
};

function getOrDefault(value) {
  if (value == null || value == undefined) return "";
  else return value;
}
</script>
