import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link as ReactLink } from 'react-router-dom'
import { useParams, useRouteMatch } from 'react-router-dom'
import { APIClient } from '../../utils/RestApiClient'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

const DOMAIN_TABLE = 'web_domain'
const CONTEXT_TABLE = 'web_context'

const schema = yup.object().shape({
    domain: yup.string().required(),
    context: yup.string().required(),
})

const FormField = ({ name, errors, register }) => {
    return (
        <Box>
            <input
                type="text"
                ref={register}
                id={name}
                label={name}
                name={name}
            />

            {errors[name] && (
                <font color="red">
                    {errors[name].message}
                    <br />
                </font>
            )}
        </Box>
    )
}

export const Settings = () => {
    const [domain, setDomain] = useState({ id: null, name: '' })
    const [context, setContext] = useState({ id: null, name: '' })
    const [open, setOpen] = useState(false)

    const { register, errors, handleSubmit, setValue } = useForm({
        mode: 'onBlur',
        defaultValues: {},
        resolver: yupResolver(schema),
        shouldUnregister: false,
    })

    useEffect(() => {
        APIClient.v1
            .get(DOMAIN_TABLE, {})
            .then((resolve) => {
                console.log('domain', resolve)
                if (resolve.length > 0) {
                    console.log('Domain resolve', resolve)
                    setDomain({ id: resolve[0].id, name: resolve[0].name })
                    setValue('domain', resolve[0].name)
                }

                APIClient.v1
                    .get(CONTEXT_TABLE, {})
                    .then((resolve) => {
                        if (resolve.length > 0) {
                            console.log('context', resolve)
                            setContext({
                                id: resolve[0].id,
                                name: resolve[0].name,
                            })
                            setValue('context', resolve[0].name)
                        }
                        setOpen(true)
                    })
                    .catch((error) => {
                        console.log('Err = ', error)
                    })
            })
            .catch((error) => {
                console.log('Err = ', error)
            })
    }, [])

    const handleSubmitClick = (data) => {
        console.log('data===', data)
        let isCreateDomain = false
        let isCreateContext = false
        let dataDomain = {}
        let dataContext = {}

        if (data.domain) {
            if (domain.id === null) {
                isCreateDomain = true
                dataDomain = { name: data.domain }
            } else {
                dataDomain = { id: domain.id, name: data.domain }
            }

            APIClient.v1
                .post(
                    DOMAIN_TABLE,
                    {},
                    { isCreate: isCreateDomain, data: dataDomain }
                )
                .then((resolve) => {
                    console.log('result', resolve)
                    //history.goBack()
                })
                .catch((error) => {
                    console.log('Err = ', error)
                })
        }
        if (data.context) {
            if (context.id === null) {
                isCreateContext = true
                dataContext = { name: data.context }
            } else {
                dataContext = { id: context.id, name: data.context }
            }

            APIClient.v1
                .post(
                    CONTEXT_TABLE,
                    {},
                    { isCreate: isCreateContext, data: dataContext }
                )
                .then((resolve) => {
                    console.log('result', resolve)
                    //history.goBack()
                })
                .catch((error) => {
                    console.log('Err = ', error)
                })
        }

        history.go(0)
    }

    return (
        <React.Fragment>
            <h1>Настройки</h1>
            <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(handleSubmitClick)}
            >
                {open ? (
                    <Box width="50%" m={1}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Домен</td>
                                    <td>
                                        <FormField
                                            name="domain"
                                            errors={errors}
                                            register={register}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Контекст</td>
                                    <td>
                                        <FormField
                                            name="context"
                                            errors={errors}
                                            register={register}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Сохранить
                        </Button>
                    </Box>
                ) : null}
            </form>
        </React.Fragment>
    )
}
