<template>
  <header class="header">
    <a href="./index.html" class="header__logo">
      <img src="images/m2m_logo.svg" alt="M2MSMT logo" class="header__img">
    </a>
    <nav class="nav" id="nav">
      <ul class="nav__list">
        <li class="nav__item">
          <a href="nav/list/" class="nav__link" data-page="home">
            <span class="nav__icon nav__icon--satellite"></span>
            Мониторинг
          </a>
        </li>
        <li class="nav__item">
          <a href="nav/track/" class="nav__link" data-page="track">
            <span class="nav__icon nav__icon--track"></span>
            Трек
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  padding: 4px 10px;
  background-color: #284669;
  color: #fff;
}

.header__logo {
  display: flex;
  margin-right: 2rem;
}

.header__img {
  width: 120px;
}

.nav {
  padding: 10px;
}

.nav__list {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav__item {

  &:not(:last-child) {
    margin-right: 2.5rem;
  }
}

.nav__icon {
  display: inline-block;
  margin-right: 5px;
  width: 20px;
  height: 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  &--satellite {
    background-image: url("@/assets/img/icon/satellite.svg");
  }
  &--track {
    background-image: url("@/assets/img/icon/road.svg");
  }
}

.nav__link {
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
  color: inherit;
}
</style>
