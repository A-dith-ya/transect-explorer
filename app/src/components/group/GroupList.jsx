

export default GroupList

function GroupList ({data}) {

  console.log(data);

  return (
    <div className='table-div'>
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Member</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) =><tr key={item.id} onClick={() => navigate(`/group/${item.id}`)}> 
              <td key={Math.random()}>{item.role.charAt(0)}</td>
              <td key={Math.random()}>{item.name}</td>
              <td key={Math.random()}>{item.email}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
