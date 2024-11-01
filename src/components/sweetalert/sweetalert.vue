<template>
    <div>
      <button @click="showAlert">Tampilkan Alert</button>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  
  export default {
    name: 'SweetAlert',
    methods: {
      showAlert() {
        Swal.fire({
          title: 'Peringatan!',
          text: 'Ini adalah pesan alert.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, lanjutkan!',
          cancelButtonText: 'Tidak, batalkan!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Dikonfirmasi!',
              'Tindakan telah dikonfirmasi.',
              'success'
            );
          } else {
            Swal.fire(
              'Dibatalkan',
              'Tindakan dibatalkan.',
              'error'
            );
          }
        });
      }
    }
  }
  </script>
  
  <style scoped>
  /* Tambahkan gaya jika diperlukan */
  </style>
  