import React, { useState, useEffect } from "react";
import * as S from "./styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FilterCard from "../../components/FilterCard";
import TaskCard from "../../components/TaskCard";
import api from "../../services/api";

// Array com variáveis
// const tasks = [{ "done": false, "created": "2021-10-23T20:05:31.643Z", "_id": "101", "macaddress": "9191", "type": 5, "title": "Futebol Com a Galera", "description": "Jogar Futebol", "when": "10/05/2021", "__v": 0 },
// { "done": false, "created": "2021-10-23T20:05:31.643Z", "_id": "102", "macaddress": "6666", "type": 2, "title": "Comprar Café", "description": "Café é Vida", "when": "11/05/2021", "__v": 0 }];

// const filter = [{ "title": "Todos", "actived": true }, { "title": "Hoje", "actived": false }, { "title": "Semana", "actived": false }, { "title": "Mês", "actived": false }, { "title": "Ano", "actived": false }];

function Home() {
    const [filterActived, setFilterActived] = useState("all");
    const [tasksApi, setTasksApi] = useState([]);

    async function loadTasks() {
        try {
            const { data } = await api.get(`/task/filter/${filterActived}/321654`);
            setTasksApi(data);
        } catch (error) { }

        // await api.get(`/task/filter/${filterActived}/321654`).then( response => {
        //     setTasksApi(response.data)
        // })
    }

    useEffect(() => {
        loadTasks();
    }, [filterActived]);

    // última aula 17/11/21

    return (
        <S.Container>
            {/* Header */}
            <Header />

            <S.FilterArea>
                {/* {
                        // percorre todo o array de filtros
                        filter.map((f, idx) => {
                            return (
                                <FilterCard key={idx} title={f.title} actived={f.actived} />
                            )
                        })
                    } */}

                <button onClick={() => setFilterActived("all")}>
                    <FilterCard title={"Todos"} actived={filterActived === "all"} />
                </button>

                <button onClick={() => setFilterActived("today")}>
                    <FilterCard title={"Hoje"} actived={filterActived === "today"} />
                </button>

                <button onClick={() => setFilterActived("week")}>
                    <FilterCard title={"Semana"} actived={filterActived === "week"} />
                </button>

                <button onClick={() => setFilterActived("month")}>
                    <FilterCard title={"Mês"} actived={filterActived === "month"} />
                </button>

                <button onClick={() => setFilterActived("year")}>
                    <FilterCard title={"Ano"} actived={filterActived === "year"} />
                </button>
                
            </S.FilterArea>

            <S.Title>
                <h3>TAREFAS</h3>
            </S.Title>

            <S.Content>
                {
                    // percorre todo o array com as tarefas
                    tasksApi.map((t, i) => {
                        // tasks.map((t, i) => {
                        return (
                            <TaskCard
                                type={t.type}
                                title={t.title}
                                when={t.when}
                                done={t.done}
                                key={i}
                            />
                        );
                    })
                }
            </S.Content>

            {/* Footer */}
            <Footer />
        </S.Container>
    );
}

export default Home;
