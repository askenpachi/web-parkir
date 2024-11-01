<template>
  <footer class="footer">
    <p>© 2024 PT.TEKNOLOGI MULIA SEJAHTERA.</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style scoped>
.footer {
  width: 100vw;           /* Memastikan footer menutupi seluruh lebar layar */
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;     /* Mengatur teks agar berada di tengah */
  font-size: 14px;
  color: #333;
  position: fixed;        /* Membuat footer tetap di bagian bawah layar */
  bottom: 0;
  left: 0;
  z-index: 1;             /* Agar tetap di bawah elemen lainnya */
}
</style>
