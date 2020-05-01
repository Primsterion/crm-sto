<template>
    <div class="work-elem">
        <p class="id">{{ work.work_id }}</p>
        <p class="fio_client">{{ work.fio }}</p>
        <p class="auto">{{ work.auto }}</p>
        <p class="fio_employer">{{ work.fio_employer }}</p>
        <p class="date">{{ new Date(work.date).toLocaleDateString() }}</p>
        <p class="status">{{ work.status }}</p>
        <div class="work-elem-actions">
            <button class="edit" @click="changeStatus">Изменить статуc</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Work',
    props: {
        work: Object
    },
    methods: {
        changeStatus(){
            this.$emit('change_status');
        }
    }
}
</script>

<style>
    .work-elem{
        width: 100%;
    }

     .work-elem{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: .1s;
    }

    .work-elem:hover{
        background: #1E88E5 !important;
        color: #fff;
    }

    .work-elem > *{
        width: 20%;
        display: block;
        text-align: center;
    }

    .work-elem:nth-child(2n){
        background: #eee;
    }
</style>