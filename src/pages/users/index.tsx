import { useEffect, useState } from 'react';
import { currentEnvironment } from '@constants';
import styles from './users.module.scss';

type Gender = 'female' | 'male' | '';

type User = {
  gender: Gender;
  login: {
    uuid: string;
  };
  name: {
    first: string;
    last: string;
  };
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [gender, setGender] = useState<Gender>('');
  const [pageToGet, setPageToGet] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const getUsers = async (page: number, gender: Gender) => {
    setLoading(true);
    try {
      const genderQueryParam = gender ? `&gender=${gender}` : ``;
      const result = await fetch(
        `${currentEnvironment.api.baseUrl}?results=5&page=${String(page)}${genderQueryParam}`,
      );
      const usersResults = (await result.json()).results as User[];

      setUsers(oldUsers =>
        page === 1 ? usersResults : [...oldUsers, ...usersResults],
      );
    } catch (error) {
      console.error('Error fetching users: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void (async () => {
      await getUsers(pageToGet, gender);
    })();
  }, [pageToGet, gender]);

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGender = event.target.value as Gender;
    setGender(selectedGender);
    setPageToGet(1); // Reset to the first page on gender change
  };

  const handleLoadMore = () => {
    setPageToGet(prevPage => prevPage + 1);
  };
  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <h2>Users</h2>
        <select
          className={styles.selectFilter}
          id="gender"
          name="gender"
          onChange={handleGenderChange}
          value={gender}
        >
          <option value="">All</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table className={styles.usersTable}>
            <thead>
              <tr>
                <th>User</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user: User) => (
                  <tr key={user.login.uuid}>
                    <td>
                      {user.name.first} {user.name.last}
                    </td>
                    <td>{user.gender}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2}>No users found</td>
                </tr>
              )}
            </tbody>
          </table>
          <button
            className={styles.loadButton}
            type="button"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </>
      )}
    </div>
  );
};

export default Users;
